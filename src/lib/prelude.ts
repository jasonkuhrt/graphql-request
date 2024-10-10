import type { IsEmptyObject, IsNever, IsUnknown, Simplify } from 'type-fest'

import type { ConditionalSimplify, ConditionalSimplifyDeep } from 'type-fest/source/conditional-simplify.js'

/* eslint-disable */
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
    const result = fn() as any
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

export const isRecordLikeObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === `object` && value !== null && !Array.isArray(value)
}

export const entries = <T extends Record<string, any>>(obj: T) => Object.entries(obj) as [keyof T, T[keyof T]][]

export const stringKeyEntries = <T extends Record<string, any>>(obj: T) =>
  Object.entries(obj) as [keyof T & string, T[keyof T & string]][]

// dprint-ignore
export const entriesStrict = <T extends Record<string, any>>(obj: T): { [K in keyof T]: [K, ExcludeUndefined<T[K]>] }[keyof T][] =>
  Object.entries(obj).filter(([_, value]) => value !== undefined) as any

export const values = <T extends Record<string, unknown>>(obj: T): T[keyof T][] => Object.values(obj) as T[keyof T][]

export type ExactNonEmpty<$Value, $Constraint> = IsEmptyObject<$Value> extends true ? never : Exact<$Value, $Constraint>
// dprint-ignore
export type Exact<$Value, $Constraint> =
  (
    $Value extends unknown  ? $Constraint extends $Value   ?  {} extends $Value    ?  $Constraint :
                                                                                      { [K in keyof $Value]: Exact<$Value[K], $Constraint[K]> } :
                                                              $Constraint :
                              never
  )
  | ($Value extends Narrowable ? $Value : never)

// dprint-ignore
// export type ExactObjectNonEmpty<$Value, $Constraint> =
//   (
//     $Value extends unknown  ? $Constraint extends $Value   ?  keyof $Value extends never  ? ({ 'TypeScript Error: You must supply at least one key.': true } & $Constraint)  :
//                                                                                             { [K in keyof $Value]: Exact<$Value[K], $Constraint[K]> } :
//                                                               $Constraint :
//                               never
//   )
//   | ($Value extends Narrowable ? $Value : never)

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

// export type StringNonEmpty = `${Letter}${string}`

// export type MaybeList<T> = T | T[]

// export type NotEmptyObject<T> = keyof T extends never ? never : T

export type Values<T> = T[keyof T]

export type ValuesOrEmptyObject<T> = keyof T extends never ? {} : T[keyof T]

export type GetKeyOr<T, Key, Or> = Key extends keyof T ? T[Key] : Or

export type As<T, U> = U extends T ? U : never

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

export type LastOf<T> = UnionToIntersection<T extends any ? () => T : never> extends () => infer R ? R : never

// // TS4.0+
// export type Push<T extends any[], V> = [...T, V]

// // TS4.1+
// export type UnionToTuple<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = true extends N ? []
//   : Push<UnionToTuple<Exclude<T, L>>, L>

// export type IsMultipleKeys<T> = IsMultiple<CountKeys<T>>
// export type CountKeys<T> = keyof T extends never ? 0 : UnionToTuple<keyof T>['length']
// export type IsMultiple<T> = T extends 0 ? false : T extends 1 ? false : true

export type ExcludeNull<T> = Exclude<T, null>
export type ExcludeUndefined<T> = Exclude<T, undefined>
export type ExcludeNullAndUndefined<T> = Exclude<T, null | undefined>

export const mapValues = <
  $Obj extends Record<string, any>,
  $Fn extends (value: $Obj[keyof $Obj], key: keyof $Obj & string) => any,
>(
  object: $Obj,
  fn: $Fn,
): Record<keyof $Obj, ReturnType<$Fn>> => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      return [key, fn(value, key)]
    }),
  ) as Record<keyof $Obj, ReturnType<$Fn>>
}

export const lowerCaseFirstLetter = (s: string) => {
  return s.charAt(0).toLowerCase() + s.slice(1)
}

export function assertArray(v: unknown): asserts v is unknown[] {
  if (!Array.isArray(v)) throw new Error(`Expected array. Got: ${String(v)}`)
}

export function assertObject(v: unknown): asserts v is object {
  if (v === null || typeof v !== `object`) throw new Error(`Expected object. Got: ${String(v)}`)
}

export type MaybePromise<T> = T | Promise<T>

export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)

export type SomeAsyncFunction = (...args: unknown[]) => Promise<unknown>

export type SomeFunction = (...args: unknown[]) => MaybePromise<unknown>

export type Deferred<T> = {
  promise: Promise<T>
  isResolved: () => boolean
  resolve: (value: T) => void
  reject: (error: unknown) => void
}

export const createDeferred = <$T>(options?: { strict?: boolean }): Deferred<$T> => {
  let isResolved = false
  let resolve: (value: $T) => void
  let reject: (error: unknown) => void

  const promise = new Promise<$T>(($resolve, $reject) => {
    resolve = $resolve
    reject = $reject
  })

  return {
    promise,
    isResolved: () => isResolved,
    resolve: (value) => {
      isResolved = true
      if (options?.strict && isResolved) {
        throw new Error(`Deferred is already resolved. Attempted to resolve with: ${JSON.stringify(value)}`)
      }
      resolve(value)
    },
    reject: (error) => reject(error),
  }
}

export const debug = (...args: any[]) => {
  if (process.env[`DEBUG`]) {
    console.log(...args)
  }
}

export const debugSub = (...args: any[]) => (...subArgs: any[]) => {
  debug(...args, ...subArgs)
}

export type PlusOneUpToTen<n extends number> = n extends 0 ? 1
  : n extends 1 ? 2
  : n extends 2 ? 3
  : n extends 3 ? 4
  : n extends 4 ? 5
  : n extends 5 ? 6
  : n extends 6 ? 7
  : n extends 7 ? 8
  : n extends 8 ? 9
  : n extends 9 ? 10
  : never

export type MinusOneUpToTen<n extends number> = n extends 10 ? 9
  : n extends 9 ? 8
  : n extends 8 ? 7
  : n extends 7 ? 6
  : n extends 6 ? 5
  : n extends 5 ? 4
  : n extends 4 ? 3
  : n extends 3 ? 2
  : n extends 2 ? 1
  : n extends 1 ? 0
  : never

// dprint-ignore
export type findIndexForValue<value, list extends AnyReadOnlyListNonEmpty> =
  findIndexForValue_<value, list, 0>

// dprint-ignore
type findIndexForValue_<value, list extends AnyReadOnlyListNonEmpty, i extends number> =
  value extends list[i]
    ? i
    : findIndexForValue_<value, list, PlusOneUpToTen<i>>

export type FindValueAfter<value, list extends AnyReadOnlyListNonEmpty> =
  list[PlusOneUpToTen<findIndexForValue<value, list>>]

// dprint-ignore
export type TakeValuesBefore<$Value, $List extends AnyReadOnlyList> =
  $List extends readonly [infer $ListFirst, ...infer $ListRest]
    ? $Value extends $ListFirst
      ? []
      : [$ListFirst, ...TakeValuesBefore<$Value, $ListRest>]
    : []

type AnyReadOnlyListNonEmpty = readonly [any, ...any[]]
type AnyReadOnlyList = readonly [...any[]]

export type ValueOr<value, orValue> = value extends undefined ? orValue : value

export type FindValueAfterOr<value, list extends readonly [any, ...any[]], orValue> = ValueOr<
  list[PlusOneUpToTen<findIndexForValue<value, list>>],
  orValue
>

export type GetLastValue<T extends readonly [any, ...any[]]> = T[MinusOneUpToTen<T['length']>]

export type IsLastValue<value, list extends readonly [any, ...any[]]> = value extends GetLastValue<list> ? true : false

export type Include<T, U> = T extends U ? T : never

export const partitionErrors = <T>(array: T[]): [Exclude<T, Error>[], Include<T, Error>[]] => {
  const errors: Include<T, Error>[] = []
  const values: Exclude<T, Error>[] = []
  for (const item of array) {
    if (item instanceof Error) {
      errors.push(item as any)
    } else {
      values.push(item as any)
    }
  }
  return [values, errors]
}

export namespace ConfigManager {
  type Path = [...string[]]

  export type ReadOrDefault<$Obj, $Path extends Path, $Default> = OrDefault<Read<$Obj, $Path>, $Default>

  // dprint-ignore
  export type OrDefault<$Value, $Default> =
    // When no value has been passed in, because the property is optional,
    // then the inferred type is unknown.
    IsUnknown<$Value> extends true ? $Default :
    $Value extends undefined       ? $Default :
                                     $Value

  // dprint-ignore
  export type Read<$Value, $Path extends [...string[]]> =
  $Value extends undefined ? undefined
  : $Path extends [infer P1 extends string, ...infer PN extends string[]] ?
   $Value extends object ?	P1 extends keyof $Value ? Read<$Value[P1], PN> : undefined
              : undefined
  : $Value

  export type SetProperty<$Obj extends object, $Prop extends keyof $Obj, $Type extends $Obj[$Prop]> =
    & Omit<$Obj, $Prop>
    & { [_ in $Prop]: $Type }

  // dprint-ignore
  export type Set<$Obj extends object, $Path extends Path, $Value> =
    Simplify<
      $Path extends []
        ? $Value extends object
          ? $Obj & $Value
          : never
        : Set_<$Obj, $Path, $Value>
    >

  // dprint-ignore
  export type Set_<$ObjOrValue, $Path extends Path, $Value> =
    Simplify<
      $Path extends [infer $P1 extends string, ...infer $PN extends string[]] ?
        $P1 extends keyof $ObjOrValue
            ? Omit<$ObjOrValue, $P1> & { [_ in $P1]: Set_<$ObjOrValue[$P1], $PN, $Value> }
            // If we use a nice error display here (like the following comment) it will mess with the result type in variable cases.
             // `Error: Cannot set value at path in object. Path property "${$P1}" does not exist in object.`
            : never
        : $Value
    >
}

// type AsBoolean<T> = T extends boolean ? T : never

export const urlParseSafe = (url: string) => {
  try {
    return new URL(url)
  } catch {
    return null
  }
}

export type PickRequiredProperties<T extends object> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K]
}

export type Negate<T extends boolean> = T extends true ? false : true

export type SimplifyExceptError<T extends unknown> = ConditionalSimplify<T, Error>

export type SimplifyExceptErrorUnion<T> = T extends any ? SimplifyExceptError<T> : never

export type SimplifyUnion<T> = T extends any ? Simplify<T> : never

export type SimplifyDeep<T> = ConditionalSimplifyDeep<T, Function | Iterable<unknown> | Date, object>

export type SimplifyDeepUnion<T> = T extends any ? SimplifyDeep<T> : never

export type RequireProperties<O extends object, K extends keyof O> = Simplify<O & { [P in K]-?: O[P] }>

export const throwNull = <V>(value: V): Exclude<V, null> => {
  if (value === null) throw new Error('Unexpected null value.')
  return value as Exclude<V, null>
}

export const proxyGet = <$Target>(
  target: $Target,
  handler: (input: { property: string; path: string[] }) => unknown,
  path: string[] = [],
): $Target => {
  return new Proxy(target, {
    get: (target: any, property: string, receiver: any) => {
      const value = Reflect.get(target, property, receiver)

      if (isRecordLikeObject(value)) {
        return proxyGet(value, handler, [...path, property])
      }

      return handler({ property, path }) ?? Reflect.get(target, property, receiver)
    },
  })
}

type PathToValue<T, Path extends readonly string[]> = Path extends [infer First, ...infer Rest]
  ? First extends keyof T ? Rest extends string[] ? PathToValue<T[First], Rest>
    : never
  : never
  : T

export const getValueAtPath = <T, Path extends readonly string[]>(
  obj: T,
  path: Path,
): PathToValue<T, Path> | undefined => {
  return path.reduce<any>((acc, key) => acc?.[key], obj)
}

export type SuffixKeyNames<$Suffix extends string, $Object extends object> = {
  [$Key in keyof $Object & string as `${$Key}${$Suffix}`]: $Object[$Key]
}

/**
 * Force intellisense to show the given union type expanded. E.g. given `Foo = A | B` then show `A | B` instead of `Foo`.
 */
export type UnionExpanded<$Union> = $Union

export const shallowMergeDefaults = <$Defaults extends object, $Input extends object>(
  defaults: $Defaults,
  input: $Input,
): $Defaults => {
  const merged = { ...defaults } as Record<string, unknown>

  for (const key in input) {
    if (input[key] !== undefined) {
      merged[key] = input[key]
    }
  }

  return merged as any
}

export type mergeObjectArray<T extends [...any[]]> = T extends [infer $First, ...infer $Rest extends any[]]
  ? $First & mergeObjectArray<$Rest>
  : {}

export const identityProxy = new Proxy({}, {
  get: () => (value: unknown) => value,
})

export type IfExtendsElse<$Type, $Extends, $Else> = $Type extends $Extends ? $Type : $Else

// dprint-ignore
export type PickOptionalPropertyOrFallback<$Object extends object, $Property extends keyof $Object, $Fallback> =
  undefined extends $Object[$Property]
    ? $Fallback
    : $Object[$Property]

export type All<$Tuple extends [...boolean[]]> = $Tuple[number] extends true ? false : true

export type HasOptionalProperty<$Object extends object, $Property extends keyof $Object> = undefined extends
  $Object[$Property] ? false
  : true

export type Push<T extends any[], V> = [...T, V]

// dprint-ignore
export type UnionToTuple<$Union, L = LastOf<$Union>, N = [$Union] extends [never] ? true : false> =
  true extends N
    ? []
    : Push<UnionToTuple<Exclude<$Union, L>>, L>

export type IsTupleMultiple<T> = T extends [unknown, unknown, ...unknown[]] ? true : false

// export type CountKeys<T> = keyof T extends never ? 0 : UnionToTuple<keyof T>['length']
// export type IsMultipleKeys<T> = IsMultiple<CountKeys<T>>
// export type IsMultiple<T> = T extends 0 ? false : T extends 1 ? false : true

// dprint-ignore
export type FirstNonUnknownNever<T extends any[]> = 
  T extends [infer First, ...infer Rest] 
    ? IsUnknown<First> extends true 
      ? FirstNonUnknownNever<Rest>
      : IsNever<First> extends true
        ? FirstNonUnknownNever<Rest>
        : First
  : never

// type Test1 = FirstNonUnknownNever<[unknown, never, 'x', number]> // string
// type Test2 = FirstNonUnknownNever<[never, 1, unknown, number, boolean]> // number
// type Test3 = FirstNonUnknownNever<[unknown, never]> // never
// type Test4 = FirstNonUnknownNever<[never, unknown, boolean, never]> // boolean

type Optional<T> = T | undefined
type IsCanBeOptional<T> = undefined extends T ? true : false

// dprint-ignore
export type IsKeyInObjectOptional<T extends Optional<object>, K extends string> =
  IsCanBeOptional<T> extends true
    ? false
    : IsKeyInObject<
        // @ts-expect-error TS thinks undefined could be here,
        // it cannot because we checked with IsCanBeOptional.
        T,
        K
      >

// dprint-ignore
export type IsKeyInObject<T extends object, K extends string> =
  K extends keyof T
    ? true
    : false

export type OmitKeysWithPrefix<$Object extends object, $Prefix extends string> = {
  [
    $Key in keyof $Object as $Key extends `${$Prefix}${infer $Suffix extends string}`
      ? $Suffix extends '' ? $Key : never
      : $Key
  ]: $Object[$Key]
}

export const getFromEnumLooselyOrThrow = <
  $Record extends { [_ in keyof $Record]: unknown },
  $Key extends string,
>(
  record: $Record,
  key: $Key,
): $Record[keyof $Record] => {
  // @ts-expect-error key lookup not safe.
  const value = record[key]
  if (value === undefined || value === null) throw new Error(`Key not found: ${String(key)}`)
  return value as any
}

export const getOptionalNullablePropertyOrThrow = <
  $Record extends { [_ in keyof $Record]: unknown },
  $Key extends keyof $Record,
>(
  record: $Record,
  key: $Key,
): ExcludeNullAndUndefined<$Record[$Key]> => {
  const value = record[key]
  if (value === undefined || value === null) throw new Error(`Key not found: ${String(key)}`)
  return value as ExcludeNullAndUndefined<$Record[$Key]>
}

export const omitUndefinedKeys = <T extends object>(obj: T): OmitUndefinedKeys<T> => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined)) as any
}

type OmitUndefinedKeys<T extends object> = {
  [K in keyof T as undefined extends T[K] ? K : never]: T[K]
}

export type StringKeyof<T> = keyof T & string

export const keysStrict = <T extends object>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[]
}

export type HasKeys<T> = keyof T extends never ? false : true

export type IsHasIndexType<T> = string extends keyof T ? true : false

export const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}

export const isNonNull = <$Value>(value: $Value): value is ExcludeNull<$Value> => {
  return value !== null
}
