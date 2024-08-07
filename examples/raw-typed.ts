import type { TypedQueryDocumentNode } from 'graphql'
import { gql, Graffle } from '../src/entrypoints/alpha/main.js'
import { publicGraphQLSchemaEndpoints } from './$helpers.js'

const graffle = Graffle.create({
  schema: publicGraphQLSchemaEndpoints.SocialStudies,
})

/*************************************** Variation 1 ***************************************
 * -
 * -
 * -
 * You can pass type variables to the `gql` template tag.
 * -
 */

{
  const document = gql<{ countries: { name: string; continent: { name: string } }[] }, { filter: string[] }>`
    query countries ($filter: [String!]) {
      countries (filter: { name: { in: $filter } }) {
        name
        continent {
          name
        }
      }
    }
  `

  const result = await graffle.raw({ document, variables: { filter: [`Canada`, `Germany`, `Japan`] } })

  console.log(result.data?.countries)
}

/*************************************** Variation 2 ***************************************
 * -
 * -
 * -
 * You can also cast the type if you have a reference to a pre constructed type.
 * -
 */

{
  type Document = TypedQueryDocumentNode<
    { countries: { name: string; continent: { name: string } }[] },
    { filter: string[] }
  >

  const document: Document = gql`
    query countries ($filter: [String!]) {
      countries (filter: { name: { in: $filter } }) {
        name
        continent {
          name
        }
      }
    }
  `

  const result = await graffle.raw({ document, variables: { filter: [`Canada`, `Germany`, `Japan`] } })

  console.log(result.data?.countries)
}
