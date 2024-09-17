<div class="ExampleSnippet">
<a href="../../examples/output/return-error-execution">Return Error Execution</a>

<!-- dprint-ignore-start -->
```ts twoslash
// ---cut---
import { Pokemon } from './pokemon/__.js'

const pokemon = Pokemon
  .create({
    schema: `http://localhost:3000/graphql`,
    output: {
      envelope: false,
      errors: {
        execution: `return`,
        other: `throw`,
      },
    },
  })

// 1. The __execution__ error of an empty Pokemon name will be ***returned***.

type _result = typeof result
const result = await pokemon.mutation.addPokemon({
  $: { name: ``, hp: 1, defense: 0, attack: 0 },
  name: true,
})
console.log(result)

// 2. The __other__ error, in this case from the inline extension, will be ***thrown***.

try {
  await pokemon
    .anyware(({ encode: _ }) => {
      throw new Error(`Something went wrong.`)
    })
    .query
    .pokemon({ name: true })
} catch (error) {
  console.log(error)
}
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
ContextualAggregateError: One or more errors in the execution result.
    at handleOutput (/some/path/to/handleOutput.ts:XX:XX)
    at run (/some/path/to/client.ts:XX:XX)
    at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX)
    at async executeRootType (/some/path/to/client.ts:XX:XX)
    at async executeRootTypeField (/some/path/to/client.ts:XX:XX)
    at async <anonymous> (/some/path/to/output_return-error_return-error-execution__return-error-execution.ts:XX:XX) {
  context: {},
  cause: undefined,
  errors: [
    GraphQLError: [
      {
        "code": "too_small",
        "minimum": 1,
        "type": "string",
        "inclusive": true,
        "exact": false,
        "message": "Pokemon name cannot be empty.",
        "path": [
          "name"
        ]
      }
    ]
        at <anonymous> (/some/path/to/graphqlHTTP.ts:XX:XX)
        at Array.map (<anonymous>)
        at parseExecutionResult (/some/path/to/graphqlHTTP.ts:XX:XX)
        at Object.unpack (/some/path/to/core.ts:XX:XX)
        at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX)
        at async runHook (/some/path/to/runHook.ts:XX:XX) {
      path: [ 'addPokemon' ],
      locations: undefined,
      extensions: [Object: null prototype] {}
    }
  ]
}
```
<!-- dprint-ignore-end -->
<!-- dprint-ignore-start -->
```txt
ContextualError: There was an error in the extension "anonymous" (use named functions to improve this error message) while running hook "encode".
    at runPipeline (/some/path/to/runPipeline.ts:XX:XX)
    at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX)
    at async Object.run (/some/path/to/main.ts:XX:XX)
    at async run (/some/path/to/client.ts:XX:XX)
    at async executeRootType (/some/path/to/client.ts:XX:XX)
    at async executeRootTypeField (/some/path/to/client.ts:XX:XX)
    at async <anonymous> (/some/path/to/output_return-error_return-error-execution__return-error-execution.ts:XX:XX) {
  context: {
    hookName: 'encode',
    source: 'extension',
    extensionName: 'anonymous'
  },
  cause: Error: Something went wrong.
      at <anonymous> (/some/path/to/output_return-error_return-error-execution__return-error-execution.ts:XX:XX)
      at applyBody (/some/path/to/main.ts:XX:XX)
      at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX)
}
```
<!-- dprint-ignore-end -->

</div>