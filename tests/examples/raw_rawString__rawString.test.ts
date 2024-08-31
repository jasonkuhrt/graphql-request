// @vitest-environment node

// WARNING:
// This test is generated by scripts/generate-test-examples.ts
// Do not modify this file directly.

import { execaCommand } from 'execa'
import stripAnsi from 'strip-ansi'
import { expect, test } from 'vitest'

test(`raw_rawString__rawString`, async () => {
  const result = await execaCommand(`pnpm tsx ./examples/raw_rawString__rawString.ts`)
  expect(result.exitCode).toBe(0)
  // Examples should output their data results.
  const exampleResult = stripAnsi(result.stdout)
  const nodeMajor = process.version.match(/v(\d+)/)?.[1] ?? `unknown`
  await expect(exampleResult).toMatchFileSnapshot(
    `../.././examples/raw_rawString__rawString.output.node-${nodeMajor}.txt`,
  )
})
