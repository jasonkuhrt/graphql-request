import { beforeEach } from 'vitest'
import { createExtension } from '../../src/entrypoints/main.js'
import type { Config } from '../../src/entrypoints/utilities-for-generated.js'
import type { HookDefEncode, HookDefExchange, HookDefPack } from '../../src/layers/5_request/hooks.js'

export const Spy = () =>
  createExtension({
    name: `Spy`,
    onRequest: async ({ encode }) => {
      Spy.data.encode.input = encode.input
      const { pack } = await encode()
      Spy.data.pack.input = pack.input
      const { exchange } = await pack()
      Spy.data.exchange.input = exchange.input
      return exchange()
    },
  })

interface SpyData {
  encode: {
    input: HookDefEncode<Config>['input'] | null
  }
  pack: {
    input: HookDefPack<Config>['input'] | null
  }
  exchange: {
    input: HookDefExchange<Config>['input'] | null
  }
}

const emptySpyData: SpyData = {
  encode: {
    input: null,
  },
  pack: {
    input: null,
  },
  exchange: {
    input: null,
  },
}

Spy.data = emptySpyData

beforeEach(() => {
  Spy.data = emptySpyData
})
