import * as FS from 'node:fs/promises'
import { deleteFiles } from './lib/deleteFiles.js'
import { readFiles } from './lib/readFiles.js'

// Handle case of renaming or deleting examples.
await deleteFiles({ pattern: `./tests/examples/*.test.ts` })

const files = await readFiles({
  pattern: `./examples/*.ts`,
  options: { ignore: [`./examples/$*`] },
})

await Promise.all(files.map(async (file) => {
  const code = `// @vitest-environment node

// WARNING:
// This test is generated by scripts/generate-test-examples.ts
// Do not modify this file directly.

import { execaCommand } from 'execa'
import stripAnsi from 'strip-ansi'
import { expect, test } from 'vitest'

test(\`${file.name}\`, async () => {
  const result = await execaCommand(\`pnpm tsx ./examples/${file.name}.ts\`)
  expect(result.exitCode).toBe(0)
  // Examples should output their data results.
  const exampleResult = stripAnsi(result.stdout)
  await expect(exampleResult).toMatchFileSnapshot(\`../../${file.path.dir}/${file.name}.output.txt\`)
})
`

  await FS.writeFile(`./tests/examples/${file.name}.test.ts`, code)
}))

console.log(`Generated a test for each example.`)
