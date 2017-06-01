'use strict';

const Hapi = require('hapi');
const Joi = require('joi');
const server = Hapi.server();
const validate = require('./validate');
const api = require('./api');
const live = require('./live');
const roles = require('./roles.json');

server.connection({ port: 3000, labels: ['api'] });
server.connection({ port: 3001, labels: ['live'] });

const io = require('socket.io')(server.select('live').listener);

io.on('connection', (socket) => {

  socket.emit('Connected!');

  socket.on('change', () => {
    console.info('change');
  });

});

server.auth.strategy('jwt', 'jwt', {
  key: '209D87C438E7761132F8228A1E5A304B7BAD3095AE85BDB1CA19AA2FD968E4EB7D94E1FE1EA62F7890DD1D55C1DEB2C73DC926F0DBD0BAC86181F6CBA1ED1435',
  validateFunc: validate,
  verifyOptions: {
    algorithms: ['HS256']
  },
  responseFunc: (request, reply) => {
    reply().header('Authentication', request.headers.authorization);
    reply().send();
  }
});

server.auth.default('jwt');

// Shared Routes
server.route(  {
  method: 'POST',
  path: '/auth',
  config: {
    validate: {
      payload: {
        session: Joi.string().required() // add .min().max()
      }
    },
    auth: false,
    plugins: {
      'hapiAuthorization': {
        roles: roles
      }
    }
  }
});

server.register({ register: api }, {
  routes: {
    prefix: '/api'
  },
  select: ['api']
}, (err) => {
  if (err) throw err;
});

server.register({ register: live }, {
  routes: {
    prefix: '/live'
  },
  select: ['live']
}, (err) => {
  if (err) throw err;
});

server.register({
  register: 'hapi-authorization',
  options: {
    roles: roles
  }
}, (err) => {
  if (err) throw err;
});

server.start((err) => {
  if (err) throw err;
  console.info(`Server started at: ${server.info.uri}`);
});
