// @vitest-environment node

// WARNING:
// This test is generated by scripts/generate-example-derivatives/generate.ts
// Do not modify this file directly.

import { expect, test } from 'vitest'
import { runExample } from '../../scripts/generate-examples-derivatives/helpers.js'

test(`raw|raw_rawString_rawTyped__rawString-typed`, async () => {
  const exampleResult = await runExample(`./examples/raw|raw_rawString_rawTyped__rawString-typed.ts`)
  // Examples should output their data results.
  const exampleResultMaybeEncoded = exampleResult
  // If ever outputs vary by Node version, you can use this to snapshot by Node version.
  // const nodeMajor = process.version.match(/v(\d+)/)?.[1] ?? `unknown`
  await expect(exampleResultMaybeEncoded).toMatchFileSnapshot(
    `../.././examples/raw|raw_rawString_rawTyped__rawString-typed.output.txt`,
  )
})
