'use strict';

const Joi = require('joi');
const Character = require('./character');

module.exports = Joi.object({
  id: Joi.string(),
  characters: Joi.array().items(Joi.object().type(Character)),
  slug: Joi.string(),
  modified: Joi.integer(),
  created: Joi.integer()
});
