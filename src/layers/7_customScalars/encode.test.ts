import { db } from '../../../tests/_/schemas/db.js'

import { expect } from 'vitest'
import { test } from '../../../tests/_/helpers.js'
import type { Graffle } from '../../../tests/_/schemas/kitchen-sink/graffle/__.js'
import { Spy } from '../../../tests/_/SpyExtension.js'
import { Select } from '../2_Select/__.js'
import { SelectionSetGraphqlMapper } from '../3_SelectGraphQLMapper/__.js'

const date0Encoded = db.date0.toISOString()
const date1Encoded = db.date1.toISOString()

type TestCase = [
  description: string,
  query: Graffle.SelectionSets.Query,
  expectedVariables: object,
]

// dprint-ignore
const testCases = test.for<TestCase>([
	[`arg enum`                                , { stringWithArgEnum: { $: { $ABCEnum: `A` } } }                                                                               , { ABCEnum: `A` }],
	[`arg field`                               , { dateArg: { $: { date: db.date0 } } }                                                                                        , { date: date0Encoded }],
	[`arg field in non-null`                   , { dateArgNonNull: { $: { date: db.date0 } } }                                                                                 , { date: date0Encoded }],
	[`arg field in list`                       , { dateArgList: { $: { date: [db.date0, db.date1] } } }                                                                        , { date: date0Encoded, date1: date1Encoded } ],
	[`arg field in list (null)`                , { dateArgList: { $: { date: null } } }                                                                                        , { date: null } ],
	[`arg field in non-null list (with list)`  , { dateArgNonNullList: { $: { date: [db.date0, db.date1] } } }                                                                 , { date: [date0Encoded, date1Encoded] }],
	[`arg field in non-null list (with null)`  , { dateArgNonNullList: { $: { date: [null, db.date0] } } }                                                                     , { date: [null, date0Encoded] }],
	[`arg field in non-null list non-null`     , { dateArgNonNullListNonNull: { $: { date: [db.date0, db.date1] } } }                                                          , { date: [date0Encoded, date1Encoded] }],
	[`input object field`                      , { dateArgInputObject: { $: { input: { idRequired: ``, dateRequired: db.date0, date: db.date1 } } } }                          , { inputX: { idRequired: ``, dateRequired: date0Encoded, date: date1Encoded } }],
	[`nested input object field`               , { InputObjectNested: { $: { input: { InputObject: { idRequired: ``, dateRequired: db.date0, date: db.date1 }}}}}              , { inputX: { InputObject: { idRequired: ``, dateRequired: date0Encoded, date: date1Encoded } } }],
])

testCases(`%s`, async ([_, query, expectedVariables], { kitchenSink }) => {
  const { document, operationsVariables } = SelectionSetGraphqlMapper.toGraphQL({
    document: Select.Document.createDocumentNormalizedFromQuerySelection(query as any),
  })
  await kitchenSink.use(Spy()).gql(document).send(operationsVariables?.$default)
  expect(Spy.data.pack.input?.request.variables).toEqual(expectedVariables)
})
