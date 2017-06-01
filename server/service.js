'use strict';

let level = require('level');
let db = level('../db');
let uuid = require('node-uuid');

function Player() {
  const PREFIX = 'player-';
  this.get = (id, next) => {
    db.get(PREFIX + id, next);
  };

  this.put = (user, next) => {
    db.put(PREFIX + uuid.v4(), user, next);
  };

  this.del = (id, next) => {
    db.del(PREFIX + id, next);
  };
}

function Session() {
  const PREFIX = 'session-';
  this.get = (id, next) => {
    db.get(PREFIX + id, next);
  };

  this.put = (session, next) => {
    db.put(PREFIX + id, session, next);
  };

  this.del = (id, next) => {
    db.del(PREFIX + id, next);
  };
}

exports.Player = Player;
exports.Session = Session;
