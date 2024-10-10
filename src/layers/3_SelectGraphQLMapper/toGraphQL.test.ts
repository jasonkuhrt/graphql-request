import { describe, expect, test } from 'vitest'
import { db } from '../../../tests/_/schemas/db.js'
import { $index } from '../../../tests/_/schemas/kitchen-sink/graffle/modules/RuntimeCustomScalars.js'
import type * as SelectionSets from '../../../tests/_/schemas/kitchen-sink/graffle/modules/SelectionSets.js'
import { Grafaid } from '../../lib/grafaid/__.js'
import { Select } from '../2_Select/__.js'
import { toGraphQL } from './toGraphQL.js'

type CasesQuery = [selectionSet: SelectionSets.Query]
const testEachQuery = test.for.bind(test)<CasesQuery>

type CasesDescriptiveQuery = [description: string, selectionSet: SelectionSets.Query]
const testEachQueryWithDescription = test.for.bind(test)<CasesDescriptiveQuery>

const tester = [
  `Query - %s`,
  (args: CasesQuery | CasesDescriptiveQuery) => {
    const [description, graffleQuery] = args.length === 1 ? [undefined, args[0]] : args

    const { document, operationsVariables } = toGraphQL({
      document: Select.Document.createDocumentNormalizedFromQuerySelection(graffleQuery as any),
      options: {
        sddm: $index,
        extractOperationVariables: true,
      },
    })

    const beforeAndAfter = `\n`
      + `\n--------------GRAFFLE QUERY-------------\n`
      + JSON.stringify(graffleQuery, null, 2)
      + `\n--------GRAPHQL DOCUMENT & VARIABLES--------\n`
      + Grafaid.Nodes.print(document)
      + `\n----------------\n`
      + JSON.stringify(operationsVariables, null, 2)
      + `\n`

    expect(beforeAndAfter).toMatchSnapshot(description)
  },
] as const

describe(`inline fragment`, () => {
  describe(`field group`, () => {
    testEachQueryWithDescription([
      [`one`, { ___: { __typename: true } }],
      [`multiple`, { ___: [{ __typename: true }, { abcEnum: true }] }],
      [`interface`, { interface: { ___: { __typename: true } } }],
      [`union`, { unionFooBar: { ___: { __typename: true } } }],
      [`directive`, { ___: { __typename: true, $include: true } }],
    ])(...tester)
  })

  describe(`type condition union`, () => {
    testEachQueryWithDescription([
      [`__typename (no fragment)`, { unionFooBar: { __typename: true } }],
      [`scalar`, { unionFooBar: { ___on_Bar: { int: true } } }],
      [`directive`, { unionFooBar: { ___on_Bar: { $skip: true, int: true } } }],
      // s({ unionFooBar: { __on_Bar: {} } }), // todo should be static type error
    ])(...tester)
  })
})

describe(`alias`, () => {
  testEachQuery([
    [{ id: [`x`, true] }],
    [{ id: [[`x`, true], [`id2`, true]] }],
    [{ id: [`x`, { $skip: true }] }],
    [{ object: [`x`, { $skip: true, id: true }] }],
  ])(...tester)
})

describe(`arguments`, () => {
  testEachQuery([
    [{ result: { $: { $case: `Object1` }, __typename: true } }],
    [{ stringWithArgs: { $: { boolean: true, float: 1 } } }],
    [{ stringWithArgs: { $: {} } }],
    // s({ objectWithArgs: { $: { id: `` } } }), // todo should be static error
    // s({ objectWithArgs: { $: {} } }), // todo should be static error
    [{ objectWithArgs: { $: { id: `` }, id: true } }],
    [{ objectWithArgs: { $: {}, id: true } }],
  ])(...tester)

  // dprint-ignore
  describe(`custom scalars`, () => {
    testEachQueryWithDescription([
      [`arg field`, { dateArg: { $: { date: db.date0 } } }],
      [`arg field in non-null`, { dateArgNonNull: { $: { date: db.date0 } } }], 
      [`arg field in list`, { dateArgList: { $: { date: [db.date0, new Date(1)] } } }], 
      [`arg field in list (null)`, { dateArgList: { $: { date: null } } }],
      [`arg field in non-null list (with list)`, { dateArgNonNullList: { $: { date: [db.date0, new Date(1)] } } }],
      [`arg field in non-null list (with null)`, { dateArgNonNullList: { $: { date: [null, db.date0] } } }],
      [`arg field in non-null list non-null`, { dateArgNonNullListNonNull: { $: { date: [db.date0, new Date(1)] } } }],
      [`input object field`, { dateArgInputObject: { $: { input: { idRequired: ``, dateRequired: db.date0, date: new Date(1) } } } }],
      [`nested input object field`, { InputObjectNested: { $: { input: { InputObject: { idRequired: ``, dateRequired: db.date0, date: new Date(1) } } } } }]
    ])(...tester)
  })
})

describe(`directive`, () => {
  describe(`$include`, () => {
    testEachQuery([
      [{ object: { $include: true, id: true } }],
      [{ object: { $include: false, id: true } }],
      [{ object: { $include: undefined, id: true } }],
      [{ object: { $include: { if: true }, id: true } }],
      [{ object: { $include: { if: false }, id: true } }],
      [{ object: { $include: { if: undefined }, id: true } }],
      [{ object: { $include: {}, id: true } }],
    ])(...tester)
  })

  describe(`$skip`, () => {
    testEachQuery([
      [{ object: { $skip: true, id: true } }],
      [{ object: { $skip: false, id: true } }],
      [{ object: { $skip: undefined, id: true } }],
      [{ object: { $skip: { if: true }, id: true } }],
      [{ object: { $skip: { if: false }, id: true } }],
      [{ object: { $skip: { if: undefined }, id: true } }],
      [{ object: { $skip: {}, id: true } }],
    ])(...tester)
  })
})

describe(`other`, () => {
  testEachQuery([
    [{ __typename: true }],
    [{ string: true }],
    // [{ string: 1 }],
    // s({ string: false }), // todo should be static error
    [{ id: true, string: false }],
    // [{ id: true, string: 0 }],
    [{ id: true, string: undefined }],
    [{ object: { id: true } }],
    [{ objectNested: { object: { string: true, id: true, int: false } } }],
    [{ objectNested: { object: { string: true, id: true, int: { $skip: true } } } }],
  ])(...tester)
})
