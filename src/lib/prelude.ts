export type RemoveIndex<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K]
}

export const uppercase = <S extends string>(str: S): Uppercase<S> => str.toUpperCase() as Uppercase<S>

export const callOrIdentity = <T>(value: MaybeLazy<T>) => {
  return typeof value === `function` ? (value as () => T)() : value
}

export type MaybeLazy<T> = T | (() => T)

export const zip = <A, B>(a: A[], b: B[]): [A, B | undefined][] => a.map((k, i) => [k, b[i]])

export const HeadersInitToPlainObject = (headers?: HeadersInit): Record<string, string> => {
  let oHeaders: Record<string, string> = {}

  if (headers instanceof Headers) {
    oHeaders = HeadersInstanceToPlainObject(headers)
  } else if (Array.isArray(headers)) {
    headers.forEach(([name, value]) => {
      if (name && value !== undefined) {
        oHeaders[name] = value
      }
    })
  } else if (headers) {
    oHeaders = headers
  }

  return oHeaders
}

export const HeadersInstanceToPlainObject = (headers: Response['headers']): Record<string, string> => {
  const o: Record<string, string> = {}
  headers.forEach((v, k) => {
    o[k] = v
  })
  return o
}

export const tryCatch = <$Return, $Throw extends Error = Error>(
  fn: () => $Return,
): $Return extends Promise<any> ? Promise<Awaited<$Return> | $Throw> : $Return | $Throw => {
  try {
    const result = fn() as any // eslint-disable-line
    if (isPromiseLikeValue(result)) {
      return result.catch((error) => {
        return errorFromMaybeError(error)
      }) as any
    }
    return result
  } catch (error) {
    return errorFromMaybeError(error) as any
  }
}

/**
 * Ensure that the given value is an error and return it. If it is not an error than
 * wrap it in one, passing the given value as the error message.
 */
export const errorFromMaybeError = (maybeError: unknown): Error => {
  if (maybeError instanceof Error) return maybeError
  return new Error(String(maybeError))
}

export const isPromiseLikeValue = (value: unknown): value is Promise<unknown> => {
  return (
    typeof value === `object`
    && value !== null
    && `then` in value
    && typeof value.then === `function`
    && `catch` in value
    && typeof value.catch === `function`
    && `finally` in value
    && typeof value.finally === `function`
  )
}

export const casesExhausted = (value: never): never => {
  throw new Error(`Unhandled case: ${String(value)}`)
}

export const isPlainObject = (value: unknown): value is object => {
  return typeof value === `object` && value !== null && !Array.isArray(value)
}

export const entries = <T extends Record<string, any>>(obj: T) => Object.entries(obj) as [keyof T, T[keyof T]][]

export const values = <T extends Record<string, unknown>>(obj: T): T[keyof T][] => Object.values(obj) as T[keyof T][]

export type Exact<A, W> =
  | (A extends unknown ? (W extends A ? { [K in keyof A]: Exact<A[K], W[K]> } : W) : never)
  | (A extends Narrowable ? A : never)

export type Narrowable = string | number | bigint | boolean | []

export type Letter = LetterLower | LetterUpper

export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

export type LetterLower =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
export type LetterUpper =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'

export type StringNonEmpty = `${Letter}${string}`

export type MaybeList<T> = T | T[]

export type NotEmptyObject<T> = keyof T extends never ? never : T

export type Values<T> = T[keyof T]

export type GetKeyOr<T, Key, Or> = Key extends keyof T ? T[Key] : Or

import type { ConditionalSimplifyDeep } from 'type-fest/source/conditional-simplify.js'

export type SimplifyDeep<T> = ConditionalSimplifyDeep<T, Function | Iterable<unknown> | Date, object> // eslint-disable-line
