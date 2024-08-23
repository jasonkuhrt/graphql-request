// @vitest-environment node

// WARNING:
// This test is generated by scripts/generate-test-examples.ts
// Do not modify this file directly.

import { execaCommand } from 'execa'
import stripAnsi from 'strip-ansi'
import { expect, test } from 'vitest'

test(`raw-typed`, async () => {
  const result = await execaCommand(`pnpm tsx ./examples/raw-typed.ts`)
  expect(result.exitCode).toBe(0)
  // Examples should output their data results.
  const exampleResult = stripAnsi(result.stdout)
  await expect(exampleResult).toMatchFileSnapshot(`../.././examples/raw-typed.output.txt`)
})
