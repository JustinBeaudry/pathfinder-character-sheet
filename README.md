Pathfinder Live Character Sheet
===============================

###Schemas

##User

``` 
  {
    id: String,
    email: String,
    name: String,
    slug: String,
    characters: [Character.id],
    games: [Game.id],
    modified: Number,
    created: Number
  }
  
```

##Game
```
  {
    id: String,
    characters: [Character.id], 
    slug: String,
    modified: Number,
    created: Number
  }
 
```

##Character
```
  {
    id: String,
    user: User.id, // foreign key to user who owns character
    slug: String, // prefixed with user slug
    name: String,
    size: String,
    class: String,
    level: Integer,
    height: String,
    weight: String,
    alignment: String,
    attributes: {
      STR: Integer,
      DEX: Integer,
      CON: Integer,
      INT: Integer,
      WIS: Integer,
      CHA: Integer
    },
    HP: Integer, 
    Speed: Integer,
    BAB: Integer,
    AC: { // calculated in combat
      total: Integer,
      'flat-footed': Integer,
      touch: Integer
    },
    skills: {
      // all the skills here
    },
    initiative: Integer, // 0 if no bonuses
    weapons: [Weapon.id],
    armors: [Armor.id],
    gear: [Item.id],
    spells: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: []
    },
    feats: [Feat.id],
    'special-abilities': [Ability.id],
    monies: {
      cp: Integer,
      sp: Integer,
      gp: Integer,
      pp: Integer
    },
    totalWeight: Float,
    xp: Integer,
    lvl: {
      [level]: {
        // snapshot of entire character object for given index/level
      }
    },
    tmp: {
      // snapshot of character with temporary adjustments, api should override returned results with this object
      // only has the attributes which are temporarily overridden
      HP: Integer // current HP is derived from tmp
    }
  }
  
  // NOTE: Most character stats are calculated on-the-fly
  // example:  Combat Maneuver Defence is a calculation of BAB + STR + DEX + SIZE + 10
  
```

###
```

{
  
}

```

All characters are run through transform functions that look at the character class and level and returns stats based on class, level, etc. 
This allows the ability to adjust rules on-the-fly
