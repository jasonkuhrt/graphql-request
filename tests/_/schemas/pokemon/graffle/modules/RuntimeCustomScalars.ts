import type * as $Utilities from '../../../../../../src/entrypoints/utilities-for-generated.js'
import * as CustomScalars from './Scalar.js'
//
//
//
//
//
//
// ==================================================================================================
//                                       GraphQLInputObjectType
// ==================================================================================================
//
//
//
//
//
//

const DateFilter: $Utilities.SchemaDrivenDataMap.InputObject = {
  n: 'DateFilter',
  f: {
    gte: {},
    lte: {},
  },
}

const PokemonFilter: $Utilities.SchemaDrivenDataMap.InputObject = {
  n: 'PokemonFilter',
  f: {
    birthday: {},
    name: {},
  },
}

const StringFilter: $Utilities.SchemaDrivenDataMap.InputObject = {
  n: 'StringFilter',
  f: {
    contains: {},
    in: {},
  },
}

//
//
//
//
//
//
// ==================================================================================================
//                                         GraphQLObjectType
// ==================================================================================================
//
//
//
//
//
//

const BattleRoyale: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    combatants: {
      // nt: CombatantMultiPokemon, <-- Assigned later to avoid potential circular dependency.
    },
    date: {},
    id: {},
    winner: {
      // nt: Trainer, <-- Assigned later to avoid potential circular dependency.
    },
  },
}

const BattleTrainer: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    combatant1: {
      // nt: CombatantSinglePokemon, <-- Assigned later to avoid potential circular dependency.
    },
    combatant2: {
      // nt: CombatantSinglePokemon, <-- Assigned later to avoid potential circular dependency.
    },
    date: {},
    id: {},
    winner: {
      // nt: Trainer, <-- Assigned later to avoid potential circular dependency.
    },
  },
}

const BattleWild: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    date: {},
    id: {},
    pokemon: {
      // nt: Pokemon, <-- Assigned later to avoid potential circular dependency.
    },
    result: {},
    trainer: {
      // nt: Trainer, <-- Assigned later to avoid potential circular dependency.
    },
    wildPokemons: {
      // nt: Pokemon, <-- Assigned later to avoid potential circular dependency.
    },
  },
}

const CombatantMultiPokemon: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    pokemons: {
      // nt: Pokemon, <-- Assigned later to avoid potential circular dependency.
    },
    trainer: {
      // nt: Trainer, <-- Assigned later to avoid potential circular dependency.
    },
  },
}

const CombatantSinglePokemon: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    pokemon: {
      // nt: Pokemon, <-- Assigned later to avoid potential circular dependency.
    },
    trainer: {
      // nt: Trainer, <-- Assigned later to avoid potential circular dependency.
    },
  },
}

const Patron: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    id: {},
    money: {},
    name: {},
  },
}

const Pokemon: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    attack: {},
    birthday: {},
    defense: {},
    hp: {},
    id: {},
    name: {},
    trainer: {
      // nt: Trainer, <-- Assigned later to avoid potential circular dependency.
    },
    type: {},
  },
}

const Trainer: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    class: {},
    fans: {
      // nt: Patron, <-- Assigned later to avoid potential circular dependency.
    },
    id: {},
    name: {},
    pokemon: {
      // nt: Pokemon, <-- Assigned later to avoid potential circular dependency.
    },
  },
}

//
//
//
//
//
//
// ==================================================================================================
//                                        GraphQLInterfaceType
// ==================================================================================================
//
//
//
//
//
//

const Being = { f: {} }

//
//
//
//
//
//
// ==================================================================================================
//                                          GraphQLUnionType
// ==================================================================================================
//
//
//
//
//
//

const Battle = { f: {} }

//
//
//
//
//
//
// ==================================================================================================
//                                          GraphQLRootType
// ==================================================================================================
//
//
//
//
//
//

const Mutation: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    addPokemon: {
      a: {
        attack: {
          it: [0],
          nt: CustomScalars.Int,
        },
        defense: {
          it: [0],
          nt: CustomScalars.Int,
        },
        hp: {
          it: [0],
          nt: CustomScalars.Int,
        },
        name: {
          it: [1],
          nt: CustomScalars.String,
        },
      },
      // nt: Pokemon, <-- Assigned later to avoid potential circular dependency.
    },
  },
}

const Query: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    battles: {
      // nt: Battle, <-- Assigned later to avoid potential circular dependency.
    },
    beings: {
      // nt: Being, <-- Assigned later to avoid potential circular dependency.
    },
    pokemon: {
      // nt: Pokemon, <-- Assigned later to avoid potential circular dependency.
    },
    pokemonByName: {
      a: {
        name: {
          it: [1],
          nt: CustomScalars.String,
        },
      },
      // nt: Pokemon, <-- Assigned later to avoid potential circular dependency.
    },
    pokemons: {
      a: {},
      // nt: Pokemon, <-- Assigned later to avoid potential circular dependency.
    },
    trainerByName: {
      a: {
        name: {
          it: [1],
          nt: CustomScalars.String,
        },
      },
      // nt: Trainer, <-- Assigned later to avoid potential circular dependency.
    },
    trainers: {
      // nt: Trainer, <-- Assigned later to avoid potential circular dependency.
    },
  },
}

//
//
//
//
//
//
// ==================================================================================================
//                                       Reference Assignments
//                                (avoids circular assignment issues)
// ==================================================================================================
//
//
//
//
//
//

BattleRoyale.f['combatants']!.nt = CombatantMultiPokemon
BattleRoyale.f['winner']!.nt = Trainer
BattleTrainer.f['combatant1']!.nt = CombatantSinglePokemon
BattleTrainer.f['combatant2']!.nt = CombatantSinglePokemon
BattleTrainer.f['winner']!.nt = Trainer
BattleWild.f['pokemon']!.nt = Pokemon
BattleWild.f['trainer']!.nt = Trainer
BattleWild.f['wildPokemons']!.nt = Pokemon
CombatantMultiPokemon.f['pokemons']!.nt = Pokemon
CombatantMultiPokemon.f['trainer']!.nt = Trainer
CombatantSinglePokemon.f['pokemon']!.nt = Pokemon
CombatantSinglePokemon.f['trainer']!.nt = Trainer
Pokemon.f['trainer']!.nt = Trainer
Trainer.f['fans']!.nt = Patron
Trainer.f['pokemon']!.nt = Pokemon
Mutation.f['addPokemon']!.nt = Pokemon
Query.f['battles']!.nt = Battle
Query.f['beings']!.nt = Being
Query.f['pokemon']!.nt = Pokemon
Query.f['pokemonByName']!.nt = Pokemon
Query.f['pokemons']!.nt = Pokemon
Query.f['trainerByName']!.nt = Trainer
Query.f['trainers']!.nt = Trainer

//
//
//
//
//
//
// ==================================================================================================
//                                               Index
// ==================================================================================================
//
//
//
//
//
//

export const $index = {
  Mutation,
  Query,
}
