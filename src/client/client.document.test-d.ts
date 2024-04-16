import { describe, expectTypeOf, test } from 'vitest'
import type { Index } from '../../tests/_/schema/generated/Index.js'
import { $Index } from '../../tests/_/schema/generated/SchemaRuntime.js'
import { schema } from '../../tests/_/schema/schema.js'
import { create } from './client.js'

// todo different error now
// @ts-expect-error infinite depth
const client = create<Index>({ schema, schemaIndex: $Index })

describe(`input`, () => {
  test(`document`, () => {
    const run = client.document({
      foo: { query: { id: true } },
    }).run
    expectTypeOf(run).toMatchTypeOf<(name: 'foo') => Promise<any>>()
  })

  test(`document`, () => {
    const run = client.document({
      foo: { query: { id: true } },
      bar: { query: { id: true } },
    }).run
    expectTypeOf(run).toMatchTypeOf<(name: 'foo' | 'bar') => Promise<any>>()
  })
})

describe(`output`, () => {
  test(`document`, () => {
    const result = client.document({
      foo: { query: { id: true } },
      bar: { query: { id: true } },
    }).run(`foo`)
    expectTypeOf(result).toEqualTypeOf<Promise<{ id: string | null }>>()
  })
  // todo mutation test
})
