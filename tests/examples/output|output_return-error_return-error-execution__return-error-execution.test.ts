// @vitest-environment node

// WARNING:
// This test is generated by scripts/generate-example-derivatives/generate.ts
// Do not modify this file directly.

import { expect, test } from 'vitest'
import { runExample } from '../../scripts/generate-examples-derivatives/helpers.js'

test(`output|output_return-error_return-error-execution__return-error-execution`, async () => {
  const exampleResult = await runExample(
    `./examples/output|output_return-error_return-error-execution__return-error-execution.ts`,
  )
  // Examples should output their data results.
  const exampleResultMaybeEncoded = exampleResult
  // If ever outputs vary by Node version, you can use this to snapshot by Node version.
  // const nodeMajor = process.version.match(/v(\d+)/)?.[1] ?? `unknown`
  await expect(exampleResultMaybeEncoded).toMatchFileSnapshot(
    `../.././examples/__outputs__/output|output_return-error_return-error-execution__return-error-execution.output.txt`,
  )
})