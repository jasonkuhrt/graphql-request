import { describe, expect, test, vi } from 'vitest'
import { core, run, runWithOptions } from './specHelpers.js'

describe(`no extensions`, () => {
  test(`passthrough to implementation`, async () => {
    const result = await run()
    expect(result).toEqual({ value: `initial+a+b` })
  })
})

describe(`one extension`, () => {
  test(`can return own result`, async () => {
    expect(
      await run(async ({ a }) => {
        const { b } = await a(a.input)
        await b(b.input)
        return 0
      }),
    ).toEqual(0)
    expect(core.hooks.a).toHaveBeenCalled()
    expect(core.hooks.b).toHaveBeenCalled()
  })
  describe(`can short-circuit`, () => {
    test(`at start, return input`, async () => {
      expect(
        // todo arrow function expression parsing not working
        await run(({ a }) => {
          return a.input
        }),
      ).toEqual({ value: `initial` })
      expect(core.hooks.a).not.toHaveBeenCalled()
      expect(core.hooks.b).not.toHaveBeenCalled()
    })
    test(`at start, return own result`, async () => {
      expect(
        // todo arrow function expression parsing not working
        await run(({ a }) => {
          return 0
        }),
      ).toEqual(0)
      expect(core.hooks.a).not.toHaveBeenCalled()
      expect(core.hooks.b).not.toHaveBeenCalled()
    })
    test(`after first hook, return own result`, async () => {
      expect(
        await run(async ({ a }) => {
          const { b } = await a(a.input)
          return b.input.value + `+x`
        }),
      ).toEqual(`initial+a+x`)
      expect(core.hooks.b).not.toHaveBeenCalled()
    })
  })
  describe(`can partially apply`, () => {
    test(`only first hook`, async () => {
      expect(
        await run(async ({ a }) => {
          return await a({ value: a.input.value + `+ext` })
        }),
      ).toEqual({ value: `initial+ext+a+b` })
    })
    test(`only second hook`, async () => {
      expect(
        await run(async ({ b }) => {
          return await b({ value: b.input.value + `+ext` })
        }),
      ).toEqual({ value: `initial+a+ext+b` })
    })
    test(`only second hook + end`, async () => {
      expect(
        await run(async ({ b }) => {
          const result = await b({ value: b.input.value + `+ext` })
          return result.value + `+end`
        }),
      ).toEqual(`initial+a+ext+b+end`)
    })
  })
})

describe(`two extensions`, () => {
  const run = runWithOptions({ entrypointSelectionMode: `optional` })
  test(`first can short-circuit`, async () => {
    const ex1 = () => 1
    const ex2 = vi.fn().mockImplementation(() => 2)
    expect(await run(ex1, ex2)).toEqual(1)
    expect(ex2).not.toHaveBeenCalled()
    expect(core.hooks.a).not.toHaveBeenCalled()
    expect(core.hooks.b).not.toHaveBeenCalled()
  })

  test(`each can adjust first hook then passthrough`, async () => {
    const ex1 = ({ a }) => a({ value: a.input.value + `+ex1` })
    const ex2 = ({ a }) => a({ value: a.input.value + `+ex2` })
    expect(await run(ex1, ex2)).toEqual({ value: `initial+ex1+ex2+a+b` })
  })

  test(`each can adjust each hook`, async () => {
    const ex1 = async ({ a }) => {
      const { b } = await a({ value: a.input.value + `+ex1` })
      return await b({ value: b.input.value + `+ex1` })
    }
    const ex2 = async ({ a }) => {
      const { b } = await a({ value: a.input.value + `+ex2` })
      return await b({ value: b.input.value + `+ex2` })
    }
    expect(await run(ex1, ex2)).toEqual({ value: `initial+ex1+ex2+a+ex1+ex2+b` })
  })

  test(`second can skip hook a`, async () => {
    const ex1 = async ({ a }) => {
      const { b } = await a({ value: a.input.value + `+ex1` })
      return await b({ value: b.input.value + `+ex1` })
    }
    const ex2 = async ({ b }) => {
      return await b({ value: b.input.value + `+ex2` })
    }
    expect(await run(ex1, ex2)).toEqual({ value: `initial+ex1+a+ex1+ex2+b` })
  })
  test(`second can short-circuit before hook a`, async () => {
    let ex1AfterA = false
    const ex1 = async ({ a }) => {
      const { b } = await a({ value: a.input.value + `+ex1` })
      ex1AfterA = true
    }
    const ex2 = async ({ a }) => {
      return 2
    }
    expect(await run(ex1, ex2)).toEqual(2)
    expect(ex1AfterA).toBe(false)
    expect(core.hooks.a).not.toHaveBeenCalled()
    expect(core.hooks.b).not.toHaveBeenCalled()
  })
  test(`second can short-circuit after hook a`, async () => {
    let ex1AfterB = false
    const ex1 = async ({ a }) => {
      const { b } = await a({ value: a.input.value + `+ex1` })
      await b({ value: b.input.value + `+ex1` })
      ex1AfterB = true
    }
    const ex2 = async ({ a }) => {
      await a({ value: a.input.value + `+ex2` })
      return 2
    }
    expect(await run(ex1, ex2)).toEqual(2)
    expect(ex1AfterB).toBe(false)
    expect(core.hooks.a).toHaveBeenCalledOnce()
    expect(core.hooks.b).not.toHaveBeenCalled()
  })
})

// todo some tests regarding error handling
// extension throws an error
// implementation throws an error
