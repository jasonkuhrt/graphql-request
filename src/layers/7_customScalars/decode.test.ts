import { describe, expect } from 'vitest'
import { createResponse, test } from '../../../tests/_/helpers.js'
import { db } from '../../../tests/_/schemas/db.js'
import type { Graffle } from '../../../tests/_/schemas/kitchen-sink/graffle/__.js'
import { Grafaid } from '../../lib/grafaid/__.js'
import { Select } from '../2_Select/__.js'
import { SelectionSetGraphqlMapper } from '../3_SelectGraphQLMapper/__.js'

const date0Encoded = db.date0.toISOString()

type TestCase = [
  describe: string,
  query: Graffle.SelectionSets.Query,
  responseData: object,
  expectedData: object,
]

type TestCaseWith = Parameters<ReturnType<typeof test.for<TestCase>>>

const withBatch: TestCaseWith = [
  `$batch query %s`,
  {},
  async ([_, query, responseData, expectedData], { fetch, kitchenSinkHttp: kitchenSink }) => {
    fetch.mockResolvedValueOnce(createResponse({ data: responseData }))
    expect(await kitchenSink.query.$batch(query)).toEqual(expectedData)
  },
]

const withGqlDocument: TestCaseWith = [
  `gql document - %s`,
  {},
  async ([_, query, responseData, expectedData], { fetch, kitchenSinkHttp: kitchenSink }) => {
    fetch.mockResolvedValueOnce(createResponse({ data: responseData }))
    const { document } = SelectionSetGraphqlMapper.toGraphQL({
      document: Select.Document.createDocumentNormalizedFromQuerySelection(query as any),
    })
    expect(await kitchenSink.gql(document).send()).toEqual(expectedData)
  },
]

const withGqlString: TestCaseWith = [
  `gql string - %s`,
  {},
  async ([_, query, responseData, expectedData], { fetch, kitchenSinkHttp: kitchenSink }) => {
    fetch.mockResolvedValueOnce(createResponse({ data: responseData }))
    const { document } = SelectionSetGraphqlMapper.toGraphQL({
      document: Select.Document.normalizeOrThrow({ query: { foo: query as any } }),
    })
    expect(await kitchenSink.gql(Grafaid.Nodes.print(document)).send()).toEqual(expectedData)
  },
]

// dprint-ignore
const testGeneralCases = test.for<TestCase>([
  [`nullable null`,              { date: true },                                              { date: null },                               { date: null }],
  [`nullable value`,             { date: true },                                              { date: date0Encoded },                       { date: db.date0 }],
  [`non-null`,                   { dateNonNull: true },                                       { dateNonNull: date0Encoded },                { dateNonNull: db.date0 }],
  [`list`,                       { dateList: true },                                          { dateList: [0, 1] },                         { dateList: [db.date0, new Date(1)] }],
  [`list list`,                  { dateListList: true },                                      { dateListList: [[0, 1],[0,1]] },             { dateListList: [[db.date0, new Date(1)],[db.date0, new Date(1)]] }],
  [`list non-null`,              { dateListNonNull: true },                                   { dateListNonNull: [0, 1] },                  { dateListNonNull: [db.date0, new Date(1)] }],
  [`object field`,               { dateObject1: { date1: true } },                            { dateObject1: { date1: date0Encoded } },     { dateObject1: { date1: db.date0 } }],
  [`interface field`,            { dateInterface1: { date1: true } },                         { dateInterface1: { date1: date0Encoded } },  { dateInterface1: { date1: db.date0 } }],
  [`interface inline fragment`,  { dateInterface1: { ___on_DateObject1: { date1: true } } },  { dateInterface1: { date1: date0Encoded } },  { dateInterface1: { date1: db.date0 } }],
])

// dprint-ignore
const testAliasCases = test.for<TestCase>([
  [`alias`,                                                  { date: [`x`, true] },                { x: date0Encoded },                                          { x: db.date0 }],
  [`interface inline fragment alias`,                        { dateInterface1: { ___on_DateObject1: { date1: [`x`, true] } } },                                  { dateInterface1: { x: date0Encoded }},                          { dateInterface1: { x: db.date0 }}],
  [`interface inline fragment nested alias`,                 { dateInterface1: { ___on_DateObject1: { ___: { date1: [`x`, true] } } } },                         { dateInterface1: { x: date0Encoded }},                          { dateInterface1: { x: db.date0 }}],
  [`inline fragment interface alias`,                        { ___: { dateInterface1: { ___on_DateObject1: { date1: [`x`, true] } } } },                         { dateInterface1: { x: date0Encoded }},                          { dateInterface1: { x: db.date0 }}],
  [`inline fragment x2 interface alias & nullable value`,    { ___: [{ dateInterface1: { ___on_DateObject1: { date1: [`x`, true] } } }, {date: [`y`,true]}] },   { dateInterface1: { x: date0Encoded }, y: date0Encoded },        { dateInterface1: { x: db.date0 }, y: db.date0 }],
])

// dprint-ignore
const testUnionCases = test.for<TestCase>([
  [`case 1with __typename`,
    { dateUnion: { __typename: true, ___on_DateObject1: { date1: true } } },
    { dateUnion: { __typename: `DateObject1`, date1: date0Encoded } },
    { dateUnion: { __typename: `DateObject1`, date1: db.date0 }}
  ],
  [`case 1 without __typename`,
    { dateUnion: { ___on_DateObject1: { date1: true } } },
    { dateUnion: { date1: date0Encoded } },
    { dateUnion: { date1: db.date0 } }
  ],
  [`case 2`,
    { dateUnion: { ___on_DateObject1: { date1: true }, ___on_DateObject2: { date2: true } } },
    { dateUnion: { date2: date0Encoded } },
    { dateUnion: { date2: db.date0 } }
  ],
  [`case 2 miss`,
    { dateUnion: { ___on_DateObject1: { date1: true }, ___on_DateObject2: { date2: true } } },
    { dateUnion: null },
    { dateUnion: null }
  ],
])

describe(`$batch`, () => {
  testGeneralCases(...withBatch)
  testAliasCases(...withBatch)
  // dprint-ignore
  describe(`object field in union`, () => {
    testUnionCases(`%s`, async ([_, query, responseData, expectedData], { fetch, kitchenSinkHttp: kitchenSink }) => {
      fetch.mockResolvedValueOnce(createResponse({ data: responseData }))
      expect(await kitchenSink.query.$batch(query)).toEqual(expectedData)
    })
  })
})

describe(`gql document`, () => {
  testGeneralCases(...withGqlDocument)
  testAliasCases(...withGqlDocument)
  testUnionCases(...withGqlDocument)
})

describe(`gql string`, () => {
  testGeneralCases(...withGqlString)
  testUnionCases(...withGqlString)
  testAliasCases(...withGqlString)
  // todo make this test with the option of opting out of string document parsing once we add that optimization feature.
  // testAliasCases(
  //   `aliases _not_ decoded - %s`,
  //   async ([_, query, responseData, __], { fetch, kitchenSinkHttp: kitchenSink }) => {
  //     fetch.mockResolvedValueOnce(createResponse({ data: responseData }))

  //     const document = SelectionSetGraphqlMapper.toGraphQL({
  //       document: Select.Document.normalizeOrThrow({ query: { foo: query as any } }),
  //     })
  //     expect(await kitchenSink.gql(print(document)).send()).toEqual(responseData)
  //   },
  // )
})
