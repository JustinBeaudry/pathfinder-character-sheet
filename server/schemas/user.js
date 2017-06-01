'use strict';

const Joi = require('joi');
const Character = require('./character');
const Game = require('./game');

module.exports = Joi.object({
  id: Joi.string(),
  email: Joi.string(),
  name: Joi.string(),
  slug: Joi.string(),
  characters: Joi.array().items(Joi.object().type(Character)),
  games: Joi.array().items(Joi.object().type(Game)),
  modified: Joi.integer(),
  created: Joi.integer()
});
