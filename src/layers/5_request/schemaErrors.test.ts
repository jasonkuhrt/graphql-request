import { parse } from 'graphql'
import { expect } from 'vitest'
import { test } from '../../../tests/_/helpers.js'
import { $Index as schema } from '../../../tests/_/schemas/kitchen-sink/graffle/modules/SchemaRuntime.js'
import type { Query } from '../../../tests/_/schemas/kitchen-sink/graffle/modules/SelectionSets.js'
import { Select } from '../2_Select/__.js'
import { SelectionSetGraphqlMapper } from '../3_SelectGraphQLMapper/__.js'
import { Throws } from '../7_extensions/Throws/Throws.js'
import { injectTypenameOnRootResultFields } from './schemaErrors.js'

type CasesQuery = [description: string, queryWithoutTypename: Query, queryWithTypename: Query]

// todo symmetrical type tests for these cases
// dprint-ignore
test.each<CasesQuery>([
  [`one result field`, 		              { resultNonNull: { } },                                      { resultNonNull: { __typename: true } }],
  [`two result fields`, 		            { resultNonNull: { }, result: { $: { $case: `ErrorOne` }}},   { resultNonNull: { __typename: true }, result: { $: { $case: `ErrorOne` }, __typename: true } }],
  [`no result fields`, 		              { id: true, object: { id: true } },                          { id: true, object: { id: true }}],
  [`__typename in fragment`,            { resultNonNull: { ___: { __typename: true  }}},             { resultNonNull: { ___: { __typename: true  }, __typename: true } }],
  [`root field in fragment`,            { ___: { resultNonNull: {} } },                              { ___: { resultNonNull: { __typename: true  }}}],
  [`root field in fragment in alias`,   { ___: { resultNonNull: [`x`, {}] } },                       { ___: { resultNonNull: [`x`, { __typename: true  }] }}],
  [`root field alias `,                 { resultNonNull: [`x`, {}] },                                { resultNonNull: [`x`, { __typename: true }] }],
])(`Query %s`, (_, queryWithoutTypenameInput, queryWithTypenameInput) => {
	const {document: documentWithTypename} = SelectionSetGraphqlMapper.toGraphQL({
    document: Select.Document.normalizeOrThrow({ query: { x: queryWithTypenameInput as any } })
  })
  const { document: documentWithoutTypename } = SelectionSetGraphqlMapper.toGraphQL({
    document: Select.Document.normalizeOrThrow({ query: { x: queryWithoutTypenameInput as any } })
  })
  injectTypenameOnRootResultFields({
    document: documentWithoutTypename,
    schema,
  })
	expect(documentWithoutTypename).toMatchObject(documentWithTypename)
})

// dprint-ignore
test(`type name field injection works for raw string requests`, async ({ kitchenSink }) => {
  // todo it would be nicer to move the extension use to the fixture but how would we get the static type for that?
  // This makes me think of a feature we need to have. Make it easy to get static types of the client in its various configured states.
  const result = await kitchenSink.use(Throws()).throws().gql`query { resultNonNull (case: Object1) { ... on Object1 { id } } }`.send()
  expect(result).toMatchObject({ resultNonNull: { __typename: `Object1`, id: `abc` } })
})

test(`type name field injection works for raw document requests`, async ({ kitchenSink }) => {
  const result = await kitchenSink.use(Throws()).throws().gql(
    parse(`query { resultNonNull (case: Object1) { ... on Object1 { id } } }`),
  ).send()
  expect(result).toMatchObject({ resultNonNull: { __typename: `Object1`, id: `abc` } })
})
