/**
 * This example shows how to leverage the extension system to dynamically manipulate headers per request.
 */

import { Graffle } from '../../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from '../$/helpers.js'

const graffle = Graffle
  .create({
    schema: publicGraphQLSchemaEndpoints.Pokemon,
  })
  .anyware(async ({ pack }) => {
    return await pack({
      input: {
        ...pack.input,
        headers: {
          'X-Sent-At-Time': Date.now().toString(),
        },
      },
    })
  })
  .anyware(async ({ exchange }) => {
    // todo wrong type / runtime value
    show(exchange.input.request)
    return exchange()
  })

await graffle.gql`{ pokemons { name } }`.send()
