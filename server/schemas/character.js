'use strict';

const Joi = require('joi');
const User = require('./user');
const Class = require('./class');
const Weapon = require('./weapons');
const Armor = require('./armor');
const Item = require('./item');
const Spell = require('./spell');
const Feat = require('./feat');
const Ability = require('./ability');

module.exports = Joi.object({
  id: Joi.string(),
  user: Joi.object().type(User),
  slug: Joi.string(),
  name: Joi.string(),
  size: Joi.string(),
  class: Joi.object().type(Class),
  level: Joi.integer(),
  height: Joi.string(),
  weight: Joi.string(),
  alignment: Joi.string(),
  attributes: {
    strength: Joi.integer(),
    dexterity: Joi.integer(),
    constitution: Joi.integer(),
    intelligence: Joi.integer(),
    wisdom: Joi.integer(),
    charisma: Joi.integer()
  },
  HP: Joi.integer(),
  Speed: Joi.integer(),
  initiative: Integer, // 0 if no bonuses (DEX applied when returned from API
  weapons: Joi.array().items(Joi.object().type(Weapon)),
  armors: Joi.array().items(Joi.object().type(Armor)),
  gear: Joi.array().items(Joi.object().type(Item)),
  spells: Joi.array().items(Joi.object().type(Spell)),
  feats: Joi.array().items(Joi.object().type(Feat)),
  'special-abilities': Joi.array().items(Joi.object().type(Ability)),
  monies: {
    cp: Joi.integer(),
    sp: Joi.integer(),
    gp: Joi.integer(),
    pp: Joi.integer()
  },
  totalWeight: Joi.integer(),
  xp: Joi.integer(),
  lvl: Joi.object(),
  tmp: Joi.object().any()
});
