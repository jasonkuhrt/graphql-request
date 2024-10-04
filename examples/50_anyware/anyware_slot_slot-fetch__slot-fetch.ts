/**
 * This example shows how to use the `fetch` slot on `exchange` hook.
 */
import { Graffle } from '../../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from '../$/helpers.js'

const graffle = Graffle
  .create({ schema: publicGraphQLSchemaEndpoints.Pokemon })
  .anyware(async ({ exchange }) => {
    return await exchange({
      using: {
        fetch: () => {
          return new Response(JSON.stringify({ data: { continents: [{ name: `Earthsea` }] } }))
        },
      },
    })
  })

const result = await graffle.gql`
  query {
    continents {
      name
    }
  }
`.send()

show(result)
