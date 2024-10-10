// TODO test case for recursive input objects

import SchemaBuilder from '@pothos/core'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'
import { DateTimeISOResolver } from 'graphql-scalars'
import { db } from '../db.js'

const builder = new SchemaBuilder<{
  Scalars: {
    Date: {
      Input: Date
      Output: Date
    }
  }
}>({
  plugins: [SimpleObjectsPlugin],
})

builder.addScalarType(`Date`, DateTimeISOResolver, {})

const DateInterface1 = builder.simpleInterface(`DateInterface1`, {
  fields: t => ({
    date1: t.field({ type: `Date` }),
  }),
  resolveType: value => {
    if (`date1` in value) return `DateObject1`
    throw new Error(`Cannot resolve type`)
  },
})
const DateObject1 = builder.simpleObject(`DateObject1`, {
  interfaces: [DateInterface1],
  fields: t => ({
    date1: t.field({ type: `Date` }),
  }),
})

const DateObject2 = builder.simpleObject(`DateObject2`, {
  fields: t => ({
    date2: t.field({ type: `Date` }),
  }),
})

const Object1 = builder.simpleObject(`Object1`, {
  fields: t => ({
    string: t.string(),
    int: t.int(),
    float: t.float(),
    boolean: t.boolean(),
    id: t.id(),
  }),
})

const Foo = builder.simpleObject(`Foo`, {
  description: `Object documentation.`,
  fields: t => ({
    id: t.id({ description: `Field documentation.`, deprecationReason: `Field a is deprecated.` }),
  }),
})

const Bar = builder.simpleObject(`Bar`, {
  fields: t => ({
    int: t.int(),
  }),
})

const FooBarUnion = builder.unionType(`FooBarUnion`, {
  types: [Foo, Bar],
  description: `Union documentation.`,
  resolveType: value => {
    return `int` in value ? `Bar` : `Foo`
  },
})

builder.mutationType({
  fields: t => ({
    id: t.id({ resolve: () => db.id1 }),
    idNonNull: t.id({ nullable: false, resolve: () => db.id1 }),
  }),
})

const Interface = builder.simpleInterface(`Interface`, {
  fields: t => ({
    id: t.id(),
  }),
  resolveType: value => {
    return `boolean` in value ? `Object2ImplementingInterface` : `Object1ImplementingInterface`
  },
})

builder.simpleObject(`Object1ImplementingInterface`, {
  interfaces: [Interface],
  fields: t => ({
    int: t.int(),
  }),
})

builder.simpleObject(`Object2ImplementingInterface`, {
  interfaces: [Interface],
  fields: t => ({
    boolean: t.boolean(),
  }),
})

const ErrorInterface = builder.simpleInterface(`Error`, {
  fields: t => ({
    message: t.string({ nullable: false }),
  }),
})

const ErrorOne = builder.simpleObject(`ErrorOne`, {
  interfaces: [ErrorInterface],
  fields: t => ({
    infoId: t.id(),
  }),
})

const ErrorTwo = builder.simpleObject(`ErrorTwo`, {
  interfaces: [ErrorInterface],
  fields: t => ({
    infoInt: t.int(),
  }),
})

const Result = builder.unionType(`Result`, {
  types: [Object1, ErrorOne, ErrorTwo],
  resolveType: (data) => {
    return `infoId` in data ? `ErrorOne` : `infoInt` in data ? `ErrorTwo` : `Object1`
  },
})

const ResultCase = builder.enumType(`Case`, { values: [`Object1`, `ErrorOne`, `ErrorTwo`] as const })

const DateUnion = builder.unionType(`DateUnion`, {
  types: [DateObject1, DateObject2],
  resolveType: value => {
    return `date1` in value ? `DateObject1` : `DateObject2`
  },
})

const InputObject = builder.inputType(`InputObject`, {
  fields: t => ({
    id: t.id(),
    idRequired: t.id({ required: true }),
    date: t.field({ type: `Date` }),
    dateRequired: t.field({ type: `Date`, required: true }),
  }),
})

const InputObjectNested = builder.inputType(`InputObjectNested`, {
  fields: t => ({
    InputObject: t.field({ type: InputObject }),
  }),
})

const InputObjectCircular = builder.inputRef(`InputObjectCircular`).implement({
  fields: t => ({
    date: t.field({ type: `Date` }),
    circular: t.field({ type: InputObjectCircular }),
  }),
})

const InputObjectNestedNonNull = builder.inputType(`InputObjectNestedNonNull`, {
  fields: t => ({
    InputObject: t.field({ type: InputObject, required: true }),
  }),
})

const ABCEnum = builder.enumType(`ABCEnum`, {
  description: `Enum documentation.`,
  values: {
    A: {
      deprecationReason: `Enum value A is deprecated.`,
    },
    B: {
      description: `Enum B member documentation.`,
    },
    C: {
      deprecationReason: `Enum value C is deprecated.`,
    },
  },
})

const ObjectNested = builder.simpleObject(`ObjectNested`, {
  fields: t => ({
    id: t.field({ type: `ID` }),
    object: t.field({ type: Object1 }),
  }),
})

const lowerCaseObject = builder.simpleObject(`lowerCaseObject`, {
  fields: t => ({
    id: t.id(),
  }),
})
const lowerCaseObject2 = builder.simpleObject(`lowerCaseObject2`, {
  fields: t => ({
    int: t.int(),
  }),
})
const lowerCaseUnion = builder.unionType(`lowerCaseUnion`, {
  types: [lowerCaseObject, lowerCaseObject2],
  resolveType: value => {
    return `int` in value ? `lowerCaseObject2` : `lowerCaseObject`
  },
})
const ObjectUnion = builder.simpleObject(`ObjectUnion`, {
  fields: t => ({
    fooBarUnion: t.field({ type: FooBarUnion }),
  }),
})

builder.queryType({
  fields: t => ({
    // error
    error: t.string({
      args: { case: t.arg.string({ required: false }) },
      resolve: () => {
        throw new Error(`Something went wrong.`)
      },
    }),
    // Custom Scalar
    date: t.field({ type: `Date`, resolve: () => db.date0 }),
    dateNonNull: t.field({ nullable: false, type: `Date`, resolve: () => db.date0 }),
    dateList: t.field({
      type: t.listRef(`Date`),
      resolve: () => [db.date0, db.date1],
    }),
    dateListList: t.field({
      type: t.listRef(t.listRef(`Date`)),
      resolve: () => [[db.date0, db.date1], [db.date0, db.date1]],
    }),
    dateObject1: t.field({ type: DateObject1, resolve: () => ({ date1: db.date0 }) }),
    dateUnion: t.field({ type: DateUnion, resolve: () => ({ date1: db.date0 }) }),
    dateInterface1: t.field({
      type: DateInterface1,
      resolve: () => ({ date1: db.date0 }),
    }),
    dateListNonNull: t.field({
      nullable: false,
      type: t.listRef(`Date`, { nullable: false }),
      resolve: () => [db.date0, db.date1],
    }),
    argInputObjectCircular: t.field({
      type: `String`,
      args: { input: t.arg({ type: InputObjectCircular }) },
      resolve: (_, args) => JSON.stringify(args),
    }),
    dateArg: t.field({
      type: `Date`,
      args: { date: t.arg({ type: `Date` }) },
      resolve: (_, args) => args.date ?? db.date0,
    }),
    dateArgNonNull: t.field({
      type: `Date`,
      args: { date: t.arg({ required: true, type: `Date` }) },
      resolve: (_, args) => args.date,
    }),
    dateArgList: t.field({
      type: `Date`,
      args: { date: t.arg({ type: t.arg.listRef(`Date`) }) },
      resolve: (_, args) => args.date?.[0] ?? db.date0,
    }),
    dateArgNonNullList: t.field({
      type: `Date`,
      args: { date: t.arg({ required: true, type: t.arg.listRef(`Date`, { required: false }) }) },
      resolve: (_, args) => args.date[0] ?? db.date0,
    }),
    dateArgNonNullListNonNull: t.field({
      type: `Date`,
      args: { date: t.arg({ required: true, type: t.arg.listRef(`Date`, { required: true }) }) },
      resolve: (_, args) => args.date[0] ?? db.date0,
    }),
    dateArgInputObject: t.field({
      type: `Date`,
      args: { input: t.arg({ type: InputObject }) },
      resolve: (_, args) => args.input?.date ?? db.date0,
    }),
    // Input Object
    // Note: It is important that the type `InputObjectNested` is defined before `InputObject` in the generated runtime schema.
    // This is to force the case of needing a thunk, to make sure our tests for it are actually testing the case.
    InputObjectNested: t.field({
      type: `ID`,
      args: { input: t.arg({ type: InputObjectNested }) },
      resolve: (_, args) => args.input?.InputObject?.id ?? db.id1,
    }),
    InputObjectNestedNonNull: t.field({
      type: `ID`,
      args: { input: t.arg({ type: InputObjectNestedNonNull, required: true }) },
      resolve: (_, args) => args.input.InputObject.idRequired,
    }),
    // Scalar
    id: t.id({ resolve: () => db.id1 }),
    idNonNull: t.id({ nullable: false, resolve: () => db.id1 }),
    string: t.string({ resolve: () => db.string }),
    stringWithRequiredArg: t.field({
      type: `String`,
      args: { string: t.arg.string({ required: true }) },
      resolve: (_, args) => args.string,
    }),
    stringWithArgs: t.field({
      type: `String`,
      description: `The given arguments are reflected back as a JSON string.`,
      args: {
        string: t.arg.string(),
        int: t.arg.int(),
        float: t.arg.float(),
        boolean: t.arg.boolean(),
        id: t.arg.id(),
      },
      resolve: (_, args) => {
        return JSON.stringify(args)
      },
    }),
    stringWithArgEnum: t.field({
      type: `String`,
      args: { ABCEnum: t.arg({ type: ABCEnum }) },
      resolve: (_, args) => args.ABCEnum,
    }),
    stringWithListArg: t.field({
      type: `String`,
      args: { ints: t.arg({ type: t.arg.listRef(`Int`, { required: false }) }) },
      resolve: (_, args) => JSON.stringify(args),
    }),
    stringWithListArgRequired: t.field({
      type: `String`,
      args: { ints: t.arg({ type: t.arg.listRef(`Int`), required: true }) },
      resolve: (_, args) => JSON.stringify(args),
    }),
    stringWithArgInputObject: t.field({
      type: `String`,
      args: { input: t.arg({ type: InputObject }) },
      resolve: (_, args) => JSON.stringify(args),
    }),
    stringWithArgInputObjectRequired: t.field({
      type: `String`,
      args: { input: t.arg({ type: InputObject, required: true }) },
      resolve: (_, args) => JSON.stringify(args),
    }),
    // List Scalar
    listListIntNonNull: t.field({
      nullable: false,
      type: t.listRef(t.listRef(`Int`, { nullable: false }), { nullable: false }),
      resolve: () => [[1], [2]],
    }),
    listListInt: t.field({
      type: t.listRef(t.listRef(`Int`, { nullable: true }), { nullable: true }),
      resolve: () => [[1], [2]],
    }),
    listInt: t.field({
      type: t.listRef(`Int`, { nullable: true }),
      resolve: () => [1, 2],
    }),
    listIntNonNull: t.field({
      nullable: false,
      type: t.listRef(`Int`, { nullable: false }),
      resolve: () => [1, 2],
    }),
    // Enum
    abcEnum: t.field({
      type: ABCEnum,
      description: `Query enum field documentation.`,
      resolve: () => db.ABCEnum,
    }),
    // Object
    object: t.field({
      type: Object1,
      resolve: () => db.Object1,
    }),
    objectNonNull: t.field({
      type: Object1,
      nullable: false,
      resolve: () => db.Object1,
    }),
    objectNested: t.field({
      type: ObjectNested,
      resolve: () => db.ObjectNested,
    }),
    objectWithArgs: t.field({
      args: {
        string: t.arg.string(),
        int: t.arg.int(),
        float: t.arg.float(),
        boolean: t.arg.boolean(),
        id: t.arg.id(),
      },
      type: Object1,
      resolve: (_, args) => ({ ...db.Object1, ...args }),
    }),
    // Object List
    objectList: t.field({
      type: t.listRef(Object1),
      resolve: () => [db.Object1],
    }),
    objectListNonNull: t.field({
      nullable: false,
      type: t.listRef(Object1, { nullable: false }),
      resolve: () => [db.Object1],
    }),
    // Interface
    interface: t.field({
      type: Interface,
      resolve: () => ({
        ...db.Interface,
        int: db.int,
      }),
    }),
    interfaceNonNull: t.field({
      type: Interface,
      nullable: false,
      resolve: () => ({
        ...db.Interface,
        int: db.int,
      }),
    }),
    interfaceWithArgs: t.field({
      type: Interface,
      args: { id: t.arg.id({ required: true }) },
      resolve: (_, args) => ({ id: args.id }),
    }),
    // Union
    lowerCaseUnion: t.field({ type: lowerCaseUnion, resolve: () => db.lowerCaseObject }),
    unionFooBar: t.field({ type: FooBarUnion, resolve: () => db.Foo }),
    unionFooBarNonNull: t.field({ type: FooBarUnion, nullable: false, resolve: () => db.Foo }),
    unionFooBarWithArgs: t.field({
      args: { id: t.arg.id() },
      type: FooBarUnion,
      resolve: () => db.Foo,
    }),
    unionObject: t.field({ type: ObjectUnion, resolve: () => db.ObjectUnion }),
    unionObjectNonNull: t.field({ type: ObjectUnion, nullable: false, resolve: () => db.ObjectUnion }),
    // Result
    result: t.field({
      args: { case: t.arg({ type: ResultCase, required: true }) },
      type: Result,
      resolve: (_, args) => {
        return db[args.case]
      },
    }),
    resultNonNull: t.field({
      args: { case: t.arg({ type: ResultCase, required: false }) },
      type: Result,
      nullable: false,
      resolve: (_, args) => {
        return args.case ? db[args.case] : db.Object1
      },
    }),
  }),
})

export const schema = builder.toSchema({ sortSchema: true })
