/* eslint-disable */

import * as $ from '../../../../src/entrypoints/alpha/schema.js'
import * as $Scalar from './Scalar.js'

export const $defaultSchemaUrl = undefined
export const ABCEnum = $.Enum(`ABCEnum`, [`A`, `B`, `C`])
export const Case = $.Enum(`Case`, [`ErrorOne`, `ErrorTwo`, `Object1`])

export const InputObject = $.InputObject(`InputObject`, {
  date: $.Input.field($.Input.Nullable($Scalar.Date)),
  dateRequired: $.Input.field($Scalar.Date),
  id: $.Input.field($.Input.Nullable($Scalar.ID)),
  idRequired: $.Input.field($Scalar.ID),
})

export const InputObjectNested = $.InputObject(`InputObjectNested`, {
  InputObject: $.Input.field(() => $.Input.Nullable(InputObject)),
})

export const InputObjectNestedNonNull = $.InputObject(`InputObjectNestedNonNull`, {
  InputObject: $.Input.field(() => InputObject),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Bar = $.Object$(`Bar`, {
  int: $.field($.Output.Nullable($Scalar.Int)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const DateObject1 = $.Object$(`DateObject1`, {
  date1: $.field($.Output.Nullable($Scalar.Date)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const DateObject2 = $.Object$(`DateObject2`, {
  date2: $.field($.Output.Nullable($Scalar.Date)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const ErrorOne = $.Object$(`ErrorOne`, {
  infoId: $.field($.Output.Nullable($Scalar.ID)),
  message: $.field($Scalar.String),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const ErrorTwo = $.Object$(`ErrorTwo`, {
  infoInt: $.field($.Output.Nullable($Scalar.Int)),
  message: $.field($Scalar.String),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Foo = $.Object$(`Foo`, {
  id: $.field($.Output.Nullable($Scalar.ID)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Object1 = $.Object$(`Object1`, {
  boolean: $.field($.Output.Nullable($Scalar.Boolean)),
  float: $.field($.Output.Nullable($Scalar.Float)),
  id: $.field($.Output.Nullable($Scalar.ID)),
  int: $.field($.Output.Nullable($Scalar.Int)),
  string: $.field($.Output.Nullable($Scalar.String)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Object1ImplementingInterface = $.Object$(`Object1ImplementingInterface`, {
  id: $.field($.Output.Nullable($Scalar.ID)),
  int: $.field($.Output.Nullable($Scalar.Int)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Object2ImplementingInterface = $.Object$(`Object2ImplementingInterface`, {
  boolean: $.field($.Output.Nullable($Scalar.Boolean)),
  id: $.field($.Output.Nullable($Scalar.ID)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const ObjectNested = $.Object$(`ObjectNested`, {
  id: $.field($.Output.Nullable($Scalar.ID)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  object: $.field($.Output.Nullable(() => Object1)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const ObjectUnion = $.Object$(`ObjectUnion`, {
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  fooBarUnion: $.field($.Output.Nullable(() => FooBarUnion)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const lowerCaseObject = $.Object$(`lowerCaseObject`, {
  id: $.field($.Output.Nullable($Scalar.ID)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const lowerCaseObject2 = $.Object$(`lowerCaseObject2`, {
  int: $.field($.Output.Nullable($Scalar.Int)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const DateUnion = $.Union(`DateUnion`, [DateObject1, DateObject2])

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const FooBarUnion = $.Union(`FooBarUnion`, [Bar, Foo])

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Result = $.Union(`Result`, [ErrorOne, ErrorTwo, Object1])

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const lowerCaseUnion = $.Union(`lowerCaseUnion`, [lowerCaseObject, lowerCaseObject2])

export const DateInterface1 = $.Interface(`DateInterface1`, { date1: $.field($.Output.Nullable($Scalar.Date)) }, [
  DateObject1,
])
export const Error = $.Interface(`Error`, { message: $.field($Scalar.String) }, [ErrorOne, ErrorTwo])
export const Interface = $.Interface(`Interface`, { id: $.field($.Output.Nullable($Scalar.ID)) }, [
  Object1ImplementingInterface,
  Object2ImplementingInterface,
])

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Mutation = $.Object$(`Mutation`, {
  id: $.field($.Output.Nullable($Scalar.ID)),
  idNonNull: $.field($Scalar.ID),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Query = $.Object$(`Query`, {
  InputObjectNested: $.field($.Output.Nullable($Scalar.ID), $.Args({ input: $.Input.Nullable(InputObjectNested) })),
  InputObjectNestedNonNull: $.field($.Output.Nullable($Scalar.ID), $.Args({ input: InputObjectNestedNonNull })),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  abcEnum: $.field($.Output.Nullable(ABCEnum)),
  date: $.field($.Output.Nullable($Scalar.Date)),
  dateArg: $.field($.Output.Nullable($Scalar.Date), $.Args({ date: $.Input.Nullable($Scalar.Date) })),
  dateArgInputObject: $.field($.Output.Nullable($Scalar.Date), $.Args({ input: $.Input.Nullable(InputObject) })),
  dateArgList: $.field($.Output.Nullable($Scalar.Date), $.Args({ date: $.Input.Nullable($.Input.List($Scalar.Date)) })),
  dateArgNonNull: $.field($.Output.Nullable($Scalar.Date), $.Args({ date: $Scalar.Date })),
  dateArgNonNullList: $.field(
    $.Output.Nullable($Scalar.Date),
    $.Args({ date: $.Input.List($.Input.Nullable($Scalar.Date)) }),
  ),
  dateArgNonNullListNonNull: $.field($.Output.Nullable($Scalar.Date), $.Args({ date: $.Input.List($Scalar.Date) })),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  dateInterface1: $.field($.Output.Nullable(() => DateInterface1)),
  dateList: $.field($.Output.Nullable($.Output.List($Scalar.Date))),
  dateListNonNull: $.field($.Output.List($Scalar.Date)),
  dateNonNull: $.field($Scalar.Date),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  dateObject1: $.field($.Output.Nullable(() => DateObject1)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  dateUnion: $.field($.Output.Nullable(() => DateUnion)),
  error: $.field($.Output.Nullable($Scalar.String), $.Args({ case: $.Input.Nullable($Scalar.String) })),
  id: $.field($.Output.Nullable($Scalar.ID)),
  idNonNull: $.field($Scalar.ID),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  interface: $.field($.Output.Nullable(() => Interface)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  interfaceNonNull: $.field(() => Interface),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  interfaceWithArgs: $.field($.Output.Nullable(() => Interface), $.Args({ id: $Scalar.ID })),
  listInt: $.field($.Output.Nullable($.Output.List($.Output.Nullable($Scalar.Int)))),
  listIntNonNull: $.field($.Output.List($Scalar.Int)),
  listListInt: $.field(
    $.Output.Nullable($.Output.List($.Output.Nullable($.Output.List($.Output.Nullable($Scalar.Int))))),
  ),
  listListIntNonNull: $.field($.Output.List($.Output.List($Scalar.Int))),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  lowerCaseUnion: $.field($.Output.Nullable(() => lowerCaseUnion)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  object: $.field($.Output.Nullable(() => Object1)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  objectList: $.field($.Output.Nullable($.Output.List(() => Object1))),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  objectListNonNull: $.field($.Output.List(() => Object1)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  objectNested: $.field($.Output.Nullable(() => ObjectNested)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  objectNonNull: $.field(() => Object1),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  objectWithArgs: $.field(
    $.Output.Nullable(() => Object1),
    $.Args({
      boolean: $.Input.Nullable($Scalar.Boolean),
      float: $.Input.Nullable($Scalar.Float),
      id: $.Input.Nullable($Scalar.ID),
      int: $.Input.Nullable($Scalar.Int),
      string: $.Input.Nullable($Scalar.String),
    }),
  ),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  result: $.field($.Output.Nullable(() => Result), $.Args({ case: Case })),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  resultNonNull: $.field(() => Result, $.Args({ case: $.Input.Nullable(Case) })),
  string: $.field($.Output.Nullable($Scalar.String)),
  stringWithArgEnum: $.field($.Output.Nullable($Scalar.String), $.Args({ ABCEnum: $.Input.Nullable(ABCEnum) })),
  stringWithArgInputObject: $.field(
    $.Output.Nullable($Scalar.String),
    $.Args({ input: $.Input.Nullable(InputObject) }),
  ),
  stringWithArgInputObjectRequired: $.field($.Output.Nullable($Scalar.String), $.Args({ input: InputObject })),
  stringWithArgs: $.field(
    $.Output.Nullable($Scalar.String),
    $.Args({
      boolean: $.Input.Nullable($Scalar.Boolean),
      float: $.Input.Nullable($Scalar.Float),
      id: $.Input.Nullable($Scalar.ID),
      int: $.Input.Nullable($Scalar.Int),
      string: $.Input.Nullable($Scalar.String),
    }),
  ),
  stringWithListArg: $.field(
    $.Output.Nullable($Scalar.String),
    $.Args({ ints: $.Input.Nullable($.Input.List($.Input.Nullable($Scalar.Int))) }),
  ),
  stringWithListArgRequired: $.field($.Output.Nullable($Scalar.String), $.Args({ ints: $.Input.List($Scalar.Int) })),
  stringWithRequiredArg: $.field($.Output.Nullable($Scalar.String), $.Args({ string: $Scalar.String })),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  unionFooBar: $.field($.Output.Nullable(() => FooBarUnion)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  unionFooBarNonNull: $.field(() => FooBarUnion),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  unionFooBarWithArgs: $.field($.Output.Nullable(() => FooBarUnion), $.Args({ id: $.Input.Nullable($Scalar.ID) })),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  unionObject: $.field($.Output.Nullable(() => ObjectUnion)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  unionObjectNonNull: $.field(() => ObjectUnion),
})

export const $Index = {
  name: 'default' as const,
  Root: {
    Query,
    Mutation,
    Subscription: null,
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
      Query: {
        result: 'result' as const,
        resultNonNull: 'resultNonNull' as const,
      },
      Mutation: {},
      Subscription: {},
    },
  },
}
