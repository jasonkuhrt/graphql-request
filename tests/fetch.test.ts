import { expect, test, vitest } from 'vitest'
import { gql, GraphQLClient } from '../src/entrypoints/main.js'

test(`custom fetch configuration is passed through`, async () => {
  const fetch = vitest.fn().mockResolvedValue({ ok: true, headers: new Headers(), text: () => ``, data: {} })
  const client = new GraphQLClient(`https://foobar`, {
    fetch,
    // @ts-expect-error extended fetch options
    next: {
      revalidate: 1,
    },
  })
  await client.request(gql`foo`).catch(() => {
    /* ignore */
  })
  expect(fetch.mock.calls).toMatchObject([[new URL(`https://foobar`), { next: { revalidate: 1 } }]])
})
