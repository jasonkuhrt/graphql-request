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

const InputObject: $Utilities.SchemaDrivenDataMap.InputObject = {
  n: 'InputObject',
  f: {
    date: {
      nt: CustomScalars.Date,
    },
    dateRequired: {
      nt: CustomScalars.Date,
    },
    id: {},
    idRequired: {},
  },
}

const InputObjectCircular: $Utilities.SchemaDrivenDataMap.InputObject = {
  n: 'InputObjectCircular',
  f: {
    circular: {
      // nt: InputObjectCircular, <-- Assigned later to avoid potential circular dependency.
    },
    date: {
      nt: CustomScalars.Date,
    },
  },
}

const InputObjectNested: $Utilities.SchemaDrivenDataMap.InputObject = {
  n: 'InputObjectNested',
  f: {
    InputObject: {
      // nt: InputObject, <-- Assigned later to avoid potential circular dependency.
    },
  },
}

const InputObjectNestedNonNull: $Utilities.SchemaDrivenDataMap.InputObject = {
  n: 'InputObjectNestedNonNull',
  f: {
    InputObject: {
      // nt: InputObject, <-- Assigned later to avoid potential circular dependency.
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
//                                         GraphQLObjectType
// ==================================================================================================
//
//
//
//
//
//

const Bar: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    int: {},
  },
}

const DateObject1: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    date1: {
      nt: CustomScalars.Date,
    },
  },
}

const DateObject2: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    date2: {
      nt: CustomScalars.Date,
    },
  },
}

const ErrorOne: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    infoId: {},
    message: {},
  },
}

const ErrorTwo: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    infoInt: {},
    message: {},
  },
}

const Foo: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    id: {},
  },
}

const Object1: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    boolean: {},
    float: {},
    id: {},
    int: {},
    string: {},
  },
}

const Object1ImplementingInterface: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    id: {},
    int: {},
  },
}

const Object2ImplementingInterface: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    boolean: {},
    id: {},
  },
}

const ObjectNested: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    id: {},
    object: {
      // nt: Object1, <-- Assigned later to avoid potential circular dependency.
    },
  },
}

const ObjectUnion: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    fooBarUnion: {
      // nt: FooBarUnion, <-- Assigned later to avoid potential circular dependency.
    },
  },
}

const lowerCaseObject: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    id: {},
  },
}

const lowerCaseObject2: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    int: {},
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

const DateInterface1 = {
  f: {
    ...DateObject1,
  },
}

const Error = { f: {} }

const Interface = { f: {} }

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

const DateUnion = {
  f: {
    ...DateObject1,
    ...DateObject2,
  },
}

const FooBarUnion = { f: {} }

const Result = { f: {} }

const lowerCaseUnion = { f: {} }

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
    id: {},
    idNonNull: {},
  },
}

const Query: $Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    InputObjectNested: {
      a: {},
    },
    InputObjectNestedNonNull: {
      a: {},
    },
    abcEnum: {},
    argInputObjectCircular: {
      a: {},
    },
    date: {
      nt: CustomScalars.Date,
    },
    dateArg: {
      a: {
        date: {
          it: [0],
          nt: CustomScalars.Date,
        },
      },
      nt: CustomScalars.Date,
    },
    dateArgInputObject: {
      a: {},
      nt: CustomScalars.Date,
    },
    dateArgList: {
      a: {
        date: {
          it: [0, [1]],
          nt: CustomScalars.Date,
        },
      },
      nt: CustomScalars.Date,
    },
    dateArgNonNull: {
      a: {
        date: {
          it: [1],
          nt: CustomScalars.Date,
        },
      },
      nt: CustomScalars.Date,
    },
    dateArgNonNullList: {
      a: {
        date: {
          it: [1, [0]],
          nt: CustomScalars.Date,
        },
      },
      nt: CustomScalars.Date,
    },
    dateArgNonNullListNonNull: {
      a: {
        date: {
          it: [1, [1]],
          nt: CustomScalars.Date,
        },
      },
      nt: CustomScalars.Date,
    },
    dateInterface1: {
      // nt: DateInterface1, <-- Assigned later to avoid potential circular dependency.
    },
    dateList: {
      nt: CustomScalars.Date,
    },
    dateListList: {
      nt: CustomScalars.Date,
    },
    dateListNonNull: {
      nt: CustomScalars.Date,
    },
    dateNonNull: {
      nt: CustomScalars.Date,
    },
    dateObject1: {
      // nt: DateObject1, <-- Assigned later to avoid potential circular dependency.
    },
    dateUnion: {
      // nt: DateUnion, <-- Assigned later to avoid potential circular dependency.
    },
    error: {
      a: {
        case: {
          it: [0],
          nt: CustomScalars.String,
        },
      },
    },
    id: {},
    idNonNull: {},
    interface: {
      // nt: Interface, <-- Assigned later to avoid potential circular dependency.
    },
    interfaceNonNull: {
      // nt: Interface, <-- Assigned later to avoid potential circular dependency.
    },
    interfaceWithArgs: {
      a: {
        id: {
          it: [1],
          nt: CustomScalars.ID,
        },
      },
      // nt: Interface, <-- Assigned later to avoid potential circular dependency.
    },
    listInt: {},
    listIntNonNull: {},
    listListInt: {},
    listListIntNonNull: {},
    lowerCaseUnion: {
      // nt: lowerCaseUnion, <-- Assigned later to avoid potential circular dependency.
    },
    object: {
      // nt: Object1, <-- Assigned later to avoid potential circular dependency.
    },
    objectList: {
      // nt: Object1, <-- Assigned later to avoid potential circular dependency.
    },
    objectListNonNull: {
      // nt: Object1, <-- Assigned later to avoid potential circular dependency.
    },
    objectNested: {
      // nt: ObjectNested, <-- Assigned later to avoid potential circular dependency.
    },
    objectNonNull: {
      // nt: Object1, <-- Assigned later to avoid potential circular dependency.
    },
    objectWithArgs: {
      a: {
        boolean: {
          it: [0],
          nt: CustomScalars.Boolean,
        },
        float: {
          it: [0],
          nt: CustomScalars.Float,
        },
        id: {
          it: [0],
          nt: CustomScalars.ID,
        },
        int: {
          it: [0],
          nt: CustomScalars.Int,
        },
        string: {
          it: [0],
          nt: CustomScalars.String,
        },
      },
      // nt: Object1, <-- Assigned later to avoid potential circular dependency.
    },
    result: {
      a: {},
      // nt: Result, <-- Assigned later to avoid potential circular dependency.
    },
    resultNonNull: {
      a: {},
      // nt: Result, <-- Assigned later to avoid potential circular dependency.
    },
    string: {},
    stringWithArgEnum: {
      a: {},
    },
    stringWithArgInputObject: {
      a: {},
    },
    stringWithArgInputObjectRequired: {
      a: {},
    },
    stringWithArgs: {
      a: {
        boolean: {
          it: [0],
          nt: CustomScalars.Boolean,
        },
        float: {
          it: [0],
          nt: CustomScalars.Float,
        },
        id: {
          it: [0],
          nt: CustomScalars.ID,
        },
        int: {
          it: [0],
          nt: CustomScalars.Int,
        },
        string: {
          it: [0],
          nt: CustomScalars.String,
        },
      },
    },
    stringWithListArg: {
      a: {
        ints: {
          it: [0, [0]],
          nt: CustomScalars.Int,
        },
      },
    },
    stringWithListArgRequired: {
      a: {
        ints: {
          it: [1, [1]],
          nt: CustomScalars.Int,
        },
      },
    },
    stringWithRequiredArg: {
      a: {
        string: {
          it: [1],
          nt: CustomScalars.String,
        },
      },
    },
    unionFooBar: {
      // nt: FooBarUnion, <-- Assigned later to avoid potential circular dependency.
    },
    unionFooBarNonNull: {
      // nt: FooBarUnion, <-- Assigned later to avoid potential circular dependency.
    },
    unionFooBarWithArgs: {
      a: {
        id: {
          it: [0],
          nt: CustomScalars.ID,
        },
      },
      // nt: FooBarUnion, <-- Assigned later to avoid potential circular dependency.
    },
    unionObject: {
      // nt: ObjectUnion, <-- Assigned later to avoid potential circular dependency.
    },
    unionObjectNonNull: {
      // nt: ObjectUnion, <-- Assigned later to avoid potential circular dependency.
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

InputObjectCircular.f!['circular']!.nt = InputObjectCircular
InputObjectNested.f!['InputObject']!.nt = InputObject
InputObjectNestedNonNull.f!['InputObject']!.nt = InputObject
ObjectNested.f['object']!.nt = Object1
ObjectUnion.f['fooBarUnion']!.nt = FooBarUnion
Query.f['dateInterface1']!.nt = DateInterface1
Query.f['dateObject1']!.nt = DateObject1
Query.f['dateUnion']!.nt = DateUnion
Query.f['interface']!.nt = Interface
Query.f['interfaceNonNull']!.nt = Interface
Query.f['interfaceWithArgs']!.nt = Interface
Query.f['lowerCaseUnion']!.nt = lowerCaseUnion
Query.f['object']!.nt = Object1
Query.f['objectList']!.nt = Object1
Query.f['objectListNonNull']!.nt = Object1
Query.f['objectNested']!.nt = ObjectNested
Query.f['objectNonNull']!.nt = Object1
Query.f['objectWithArgs']!.nt = Object1
Query.f['result']!.nt = Result
Query.f['resultNonNull']!.nt = Result
Query.f['unionFooBar']!.nt = FooBarUnion
Query.f['unionFooBarNonNull']!.nt = FooBarUnion
Query.f['unionFooBarWithArgs']!.nt = FooBarUnion
Query.f['unionObject']!.nt = ObjectUnion
Query.f['unionObjectNonNull']!.nt = ObjectUnion

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
