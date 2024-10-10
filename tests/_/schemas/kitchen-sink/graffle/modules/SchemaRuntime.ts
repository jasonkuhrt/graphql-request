/* eslint-disable */
import * as $ from '../../../../../../src/entrypoints/schema.js'
import * as Data from './Data.js'
import { $index as $customScalarsIndex } from './RuntimeCustomScalars.js'
import * as $Scalar from './Scalar.js'
import type { Index } from './SchemaIndex.js'
export const $defaultSchemaUrl = undefined
export const ABCEnum = $.Enum(`ABCEnum`, [`A`, `B`, `C`])
export const Case = $.Enum(`Case`, [`ErrorOne`, `ErrorTwo`, `Object1`])
export const InputObject = $.InputObject(`InputObject`, {
  date: $.Input.Field($.Input.Nullable($Scalar.Date)),
  dateRequired: $.Input.Field($Scalar.Date),
  id: $.Input.Field($.Input.Nullable($Scalar.ID)),
  idRequired: $.Input.Field($Scalar.ID),
}, true)

export const InputObjectCircular = $.InputObject(`InputObjectCircular`, {
  circular: $.Input.Field(() => $.Input.Nullable(InputObjectCircular)),
  date: $.Input.Field($.Input.Nullable($Scalar.Date)),
}, true)

export const InputObjectNested = $.InputObject(`InputObjectNested`, {
  InputObject: $.Input.Field(() => $.Input.Nullable(InputObject)),
}, true)

export const InputObjectNestedNonNull = $.InputObject(`InputObjectNestedNonNull`, {
  InputObject: $.Input.Field(() => InputObject),
}, false)
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Bar = $.Object$(`Bar`, {
  int: $.field('int', $.Output.Nullable($Scalar.Int)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const DateObject1 = $.Object$(`DateObject1`, {
  date1: $.field('date1', $.Output.Nullable($Scalar.Date)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const DateObject2 = $.Object$(`DateObject2`, {
  date2: $.field('date2', $.Output.Nullable($Scalar.Date)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const ErrorOne = $.Object$(`ErrorOne`, {
  infoId: $.field('infoId', $.Output.Nullable($Scalar.ID)),
  message: $.field('message', $Scalar.String),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const ErrorTwo = $.Object$(`ErrorTwo`, {
  infoInt: $.field('infoInt', $.Output.Nullable($Scalar.Int)),
  message: $.field('message', $Scalar.String),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Foo = $.Object$(`Foo`, {
  id: $.field('id', $.Output.Nullable($Scalar.ID)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Object1 = $.Object$(`Object1`, {
  boolean: $.field('boolean', $.Output.Nullable($Scalar.Boolean)),
  float: $.field('float', $.Output.Nullable($Scalar.Float)),
  id: $.field('id', $.Output.Nullable($Scalar.ID)),
  int: $.field('int', $.Output.Nullable($Scalar.Int)),
  string: $.field('string', $.Output.Nullable($Scalar.String)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Object1ImplementingInterface = $.Object$(`Object1ImplementingInterface`, {
  id: $.field('id', $.Output.Nullable($Scalar.ID)),
  int: $.field('int', $.Output.Nullable($Scalar.Int)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Object2ImplementingInterface = $.Object$(`Object2ImplementingInterface`, {
  boolean: $.field('boolean', $.Output.Nullable($Scalar.Boolean)),
  id: $.field('id', $.Output.Nullable($Scalar.ID)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const ObjectNested = $.Object$(`ObjectNested`, {
  id: $.field('id', $.Output.Nullable($Scalar.ID)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  object: $.field('object', $.Output.Nullable(() => Object1)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const ObjectUnion = $.Object$(`ObjectUnion`, {
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  fooBarUnion: $.field('fooBarUnion', $.Output.Nullable(() => FooBarUnion)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const lowerCaseObject = $.Object$(`lowerCaseObject`, {
  id: $.field('id', $.Output.Nullable($Scalar.ID)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const lowerCaseObject2 = $.Object$(`lowerCaseObject2`, {
  int: $.field('int', $.Output.Nullable($Scalar.Int)),
})
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const DateUnion = $.Union(`DateUnion`, [DateObject1, DateObject2])

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const FooBarUnion = $.Union(`FooBarUnion`, [Bar, Foo])

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Result = $.Union(`Result`, [ErrorOne, ErrorTwo, Object1])

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const lowerCaseUnion = $.Union(`lowerCaseUnion`, [lowerCaseObject, lowerCaseObject2])
export const DateInterface1 = $.Interface(`DateInterface1`, {
  date1: $.field('date1', $.Output.Nullable($Scalar.Date)),
}, [DateObject1])
export const Error = $.Interface(`Error`, { message: $.field('message', $Scalar.String) }, [ErrorOne, ErrorTwo])
export const Interface = $.Interface(`Interface`, { id: $.field('id', $.Output.Nullable($Scalar.ID)) }, [
  Object1ImplementingInterface,
  Object2ImplementingInterface,
])
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Mutation = $.Object$(`Mutation`, {
  id: $.field('id', $.Output.Nullable($Scalar.ID)),
  idNonNull: $.field('idNonNull', $Scalar.ID),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Query = $.Object$(`Query`, {
  InputObjectNested: $.field(
    'InputObjectNested',
    $.Output.Nullable($Scalar.ID),
    $.Args({ input: $.Input.Field($.Input.Nullable(InputObjectNested)) }, true),
  ),
  InputObjectNestedNonNull: $.field(
    'InputObjectNestedNonNull',
    $.Output.Nullable($Scalar.ID),
    $.Args({ input: $.Input.Field(InputObjectNestedNonNull) }, false),
  ),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  abcEnum: $.field('abcEnum', $.Output.Nullable(ABCEnum)),
  argInputObjectCircular: $.field(
    'argInputObjectCircular',
    $.Output.Nullable($Scalar.String),
    $.Args({ input: $.Input.Field($.Input.Nullable(InputObjectCircular)) }, true),
  ),
  date: $.field('date', $.Output.Nullable($Scalar.Date)),
  dateArg: $.field(
    'dateArg',
    $.Output.Nullable($Scalar.Date),
    $.Args({ date: $.Input.Field($.Input.Nullable($Scalar.Date)) }, true),
  ),
  dateArgInputObject: $.field(
    'dateArgInputObject',
    $.Output.Nullable($Scalar.Date),
    $.Args({ input: $.Input.Field($.Input.Nullable(InputObject)) }, true),
  ),
  dateArgList: $.field(
    'dateArgList',
    $.Output.Nullable($Scalar.Date),
    $.Args({ date: $.Input.Field($.Input.Nullable($.Input.List($Scalar.Date))) }, true),
  ),
  dateArgNonNull: $.field(
    'dateArgNonNull',
    $.Output.Nullable($Scalar.Date),
    $.Args({ date: $.Input.Field($Scalar.Date) }, false),
  ),
  dateArgNonNullList: $.field(
    'dateArgNonNullList',
    $.Output.Nullable($Scalar.Date),
    $.Args({ date: $.Input.Field($.Input.List($.Input.Nullable($Scalar.Date))) }, false),
  ),
  dateArgNonNullListNonNull: $.field(
    'dateArgNonNullListNonNull',
    $.Output.Nullable($Scalar.Date),
    $.Args({ date: $.Input.Field($.Input.List($Scalar.Date)) }, false),
  ),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  dateInterface1: $.field('dateInterface1', $.Output.Nullable(() => DateInterface1)),
  dateList: $.field('dateList', $.Output.Nullable($.Output.List($Scalar.Date))),
  dateListList: $.field('dateListList', $.Output.Nullable($.Output.List($.Output.List($Scalar.Date)))),
  dateListNonNull: $.field('dateListNonNull', $.Output.List($Scalar.Date)),
  dateNonNull: $.field('dateNonNull', $Scalar.Date),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  dateObject1: $.field('dateObject1', $.Output.Nullable(() => DateObject1)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  dateUnion: $.field('dateUnion', $.Output.Nullable(() => DateUnion)),
  error: $.field(
    'error',
    $.Output.Nullable($Scalar.String),
    $.Args({ case: $.Input.Field($.Input.Nullable($Scalar.String)) }, true),
  ),
  id: $.field('id', $.Output.Nullable($Scalar.ID)),
  idNonNull: $.field('idNonNull', $Scalar.ID),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  interface: $.field('interface', $.Output.Nullable(() => Interface)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  interfaceNonNull: $.field('interfaceNonNull', () => Interface),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  interfaceWithArgs: $.field(
    'interfaceWithArgs',
    $.Output.Nullable(() => Interface),
    $.Args({ id: $.Input.Field($Scalar.ID) }, false),
  ),
  listInt: $.field('listInt', $.Output.Nullable($.Output.List($.Output.Nullable($Scalar.Int)))),
  listIntNonNull: $.field('listIntNonNull', $.Output.List($Scalar.Int)),
  listListInt: $.field(
    'listListInt',
    $.Output.Nullable($.Output.List($.Output.Nullable($.Output.List($.Output.Nullable($Scalar.Int))))),
  ),
  listListIntNonNull: $.field('listListIntNonNull', $.Output.List($.Output.List($Scalar.Int))),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  lowerCaseUnion: $.field('lowerCaseUnion', $.Output.Nullable(() => lowerCaseUnion)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  object: $.field('object', $.Output.Nullable(() => Object1)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  objectList: $.field('objectList', $.Output.Nullable($.Output.List(() => Object1))),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  objectListNonNull: $.field('objectListNonNull', $.Output.List(() => Object1)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  objectNested: $.field('objectNested', $.Output.Nullable(() => ObjectNested)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  objectNonNull: $.field('objectNonNull', () => Object1),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  objectWithArgs: $.field(
    'objectWithArgs',
    $.Output.Nullable(() => Object1),
    $.Args({
      boolean: $.Input.Field($.Input.Nullable($Scalar.Boolean)),
      float: $.Input.Field($.Input.Nullable($Scalar.Float)),
      id: $.Input.Field($.Input.Nullable($Scalar.ID)),
      int: $.Input.Field($.Input.Nullable($Scalar.Int)),
      string: $.Input.Field($.Input.Nullable($Scalar.String)),
    }, true),
  ),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  result: $.field('result', $.Output.Nullable(() => Result), $.Args({ case: $.Input.Field(Case) }, false)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  resultNonNull: $.field('resultNonNull', () => Result, $.Args({ case: $.Input.Field($.Input.Nullable(Case)) }, true)),
  string: $.field('string', $.Output.Nullable($Scalar.String)),
  stringWithArgEnum: $.field(
    'stringWithArgEnum',
    $.Output.Nullable($Scalar.String),
    $.Args({ ABCEnum: $.Input.Field($.Input.Nullable(ABCEnum)) }, true),
  ),
  stringWithArgInputObject: $.field(
    'stringWithArgInputObject',
    $.Output.Nullable($Scalar.String),
    $.Args({ input: $.Input.Field($.Input.Nullable(InputObject)) }, true),
  ),
  stringWithArgInputObjectRequired: $.field(
    'stringWithArgInputObjectRequired',
    $.Output.Nullable($Scalar.String),
    $.Args({ input: $.Input.Field(InputObject) }, false),
  ),
  stringWithArgs: $.field(
    'stringWithArgs',
    $.Output.Nullable($Scalar.String),
    $.Args({
      boolean: $.Input.Field($.Input.Nullable($Scalar.Boolean)),
      float: $.Input.Field($.Input.Nullable($Scalar.Float)),
      id: $.Input.Field($.Input.Nullable($Scalar.ID)),
      int: $.Input.Field($.Input.Nullable($Scalar.Int)),
      string: $.Input.Field($.Input.Nullable($Scalar.String)),
    }, true),
  ),
  stringWithListArg: $.field(
    'stringWithListArg',
    $.Output.Nullable($Scalar.String),
    $.Args({ ints: $.Input.Field($.Input.Nullable($.Input.List($.Input.Nullable($Scalar.Int)))) }, true),
  ),
  stringWithListArgRequired: $.field(
    'stringWithListArgRequired',
    $.Output.Nullable($Scalar.String),
    $.Args({ ints: $.Input.Field($.Input.List($Scalar.Int)) }, false),
  ),
  stringWithRequiredArg: $.field(
    'stringWithRequiredArg',
    $.Output.Nullable($Scalar.String),
    $.Args({ string: $.Input.Field($Scalar.String) }, false),
  ),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  unionFooBar: $.field('unionFooBar', $.Output.Nullable(() => FooBarUnion)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  unionFooBarNonNull: $.field('unionFooBarNonNull', () => FooBarUnion),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  unionFooBarWithArgs: $.field(
    'unionFooBarWithArgs',
    $.Output.Nullable(() => FooBarUnion),
    $.Args({ id: $.Input.Field($.Input.Nullable($Scalar.ID)) }, true),
  ),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  unionObject: $.field('unionObject', $.Output.Nullable(() => ObjectUnion)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  unionObjectNonNull: $.field('unionObjectNonNull', () => ObjectUnion),
})
export const $Index: Index = {
  name: Data.Name,
  RootTypesPresent: ['Mutation', 'Query'] as const,
  RootUnion: undefined as any, // Type level only.
  Root: {
    Query,
    Mutation,
    Subscription: null,
  },
  allTypes: {
    Mutation,
    Query,
    DateUnion,
    FooBarUnion,
    Result,
    lowerCaseUnion,
    Bar,
    DateObject1,
    DateObject2,
    ErrorOne,
    ErrorTwo,
    Foo,
    Object1,
    Object1ImplementingInterface,
    Object2ImplementingInterface,
    ObjectNested,
    ObjectUnion,
    lowerCaseObject,
    lowerCaseObject2,
    DateInterface1,
    Error,
    Interface,
    ABCEnum,
    Case,
  },
  objects: {
    Bar,
    DateObject1,
    DateObject2,
    ErrorOne,
    ErrorTwo,
    Foo,
    Object1,
    Object1ImplementingInterface,
    Object2ImplementingInterface,
    ObjectNested,
    ObjectUnion,
    lowerCaseObject,
    lowerCaseObject2,
  },
  unions: {
    DateUnion,
    FooBarUnion,
    Result,
    lowerCaseUnion,
  },
  interfaces: {
    DateInterface1,
    Error,
    Interface,
  },
  customScalars: {
    input: $customScalarsIndex,
  },
  error: {
    objects: {
      ErrorOne,
      ErrorTwo,
    },
    objectsTypename: {
      ErrorOne: { __typename: 'ErrorOne' },
      ErrorTwo: { __typename: 'ErrorTwo' },
    },
    rootResultFields: {
      Subscription: {},
      Mutation: {},
      Query: {
        result: 'result' as const,
        resultNonNull: 'resultNonNull' as const,
      },
    },
  },
}
