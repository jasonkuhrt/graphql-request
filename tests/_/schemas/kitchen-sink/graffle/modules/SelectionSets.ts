import type { Select as $Select } from '../../../../../../src/entrypoints/schema.js'
import type * as $Utilities from '../../../../../../src/entrypoints/utilities-for-generated.js'
import type * as $Scalar from './Scalar.js'

//
//
//
//
//
//
// ==================================================================================================
//                                              Document
// ==================================================================================================
//
//
//
//
//
//

// Prefix with $ because this is not a schema type. A user could have a schema type named "Document" that this would conflict with.
export interface $Document {
  query?: Record<string, Query>
  mutation?: Record<string, Mutation>
}

//
//
//
//
//
//
// ==================================================================================================
//                                      GraphQLObjectType Types
// ==================================================================================================
//
//
//
//
//
//

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                              Mutation
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Mutation {
  /**
   * Select the `id` field on the `Mutation` object. Its type is `ID` (a `Scalar`).
   */
  id?: Mutation.id$Expanded | $Select.SelectAlias.SelectAlias<Mutation.id>
  /**
   * Select the `idNonNull` field on the `Mutation` object. Its type is `ID` (a `Scalar`).
   */
  idNonNull?: Mutation.idNonNull$Expanded | $Select.SelectAlias.SelectAlias<Mutation.idNonNull>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Mutation$FragmentInline | Mutation$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Mutation$FragmentInline extends Mutation, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Mutation {
  /**
   * This is the "expanded" version of the `id` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type id$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type id = $Select.Indicator.NoArgsIndicator

  /**
   * This is the "expanded" version of the `idNonNull` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type idNonNull$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type idNonNull = $Select.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                               Query
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Query {
  /**
   * Select the `InputObjectNested` field on the `Query` object. Its type is `ID` (a `Scalar`).
   */
  InputObjectNested?: Query.InputObjectNested$Expanded | $Select.SelectAlias.SelectAlias<Query.InputObjectNested>
  /**
   * Select the `InputObjectNestedNonNull` field on the `Query` object. Its type is `ID` (a `Scalar`).
   */
  InputObjectNestedNonNull?:
    | Query.InputObjectNestedNonNull
    | $Select.SelectAlias.SelectAlias<Query.InputObjectNestedNonNull>
  /**
   * Select the `abcEnum` field on the `Query` object. Its type is Enum.
   */
  abcEnum?: Query.abcEnum$Expanded | $Select.SelectAlias.SelectAlias<Query.abcEnum>
  /**
   * Select the `argInputObjectCircular` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  argInputObjectCircular?:
    | Query.argInputObjectCircular$Expanded
    | $Select.SelectAlias.SelectAlias<Query.argInputObjectCircular>
  /**
   * Select the `date` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  date?: Query.date$Expanded | $Select.SelectAlias.SelectAlias<Query.date>
  /**
   * Select the `dateArg` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateArg?: Query.dateArg$Expanded | $Select.SelectAlias.SelectAlias<Query.dateArg>
  /**
   * Select the `dateArgInputObject` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateArgInputObject?: Query.dateArgInputObject$Expanded | $Select.SelectAlias.SelectAlias<Query.dateArgInputObject>
  /**
   * Select the `dateArgList` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateArgList?: Query.dateArgList$Expanded | $Select.SelectAlias.SelectAlias<Query.dateArgList>
  /**
   * Select the `dateArgNonNull` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateArgNonNull?: Query.dateArgNonNull | $Select.SelectAlias.SelectAlias<Query.dateArgNonNull>
  /**
   * Select the `dateArgNonNullList` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateArgNonNullList?: Query.dateArgNonNullList | $Select.SelectAlias.SelectAlias<Query.dateArgNonNullList>
  /**
   * Select the `dateArgNonNullListNonNull` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateArgNonNullListNonNull?:
    | Query.dateArgNonNullListNonNull
    | $Select.SelectAlias.SelectAlias<Query.dateArgNonNullListNonNull>
  /**
   * Select the `dateInterface1` field on the `Query` object. Its type is Interface.
   */
  dateInterface1?: Query.dateInterface1$Expanded | $Select.SelectAlias.SelectAlias<Query.dateInterface1>
  /**
   * Select the `dateList` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateList?: Query.dateList$Expanded | $Select.SelectAlias.SelectAlias<Query.dateList>
  /**
   * Select the `dateListList` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateListList?: Query.dateListList$Expanded | $Select.SelectAlias.SelectAlias<Query.dateListList>
  /**
   * Select the `dateListNonNull` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateListNonNull?: Query.dateListNonNull$Expanded | $Select.SelectAlias.SelectAlias<Query.dateListNonNull>
  /**
   * Select the `dateNonNull` field on the `Query` object. Its type is `Date` (a `Scalar`).
   */
  dateNonNull?: Query.dateNonNull$Expanded | $Select.SelectAlias.SelectAlias<Query.dateNonNull>
  /**
   * Select the `dateObject1` field on the `Query` object. Its type is Object.
   */
  dateObject1?: Query.dateObject1$Expanded | $Select.SelectAlias.SelectAlias<Query.dateObject1>
  /**
   * Select the `dateUnion` field on the `Query` object. Its type is Union.
   */
  dateUnion?: Query.dateUnion$Expanded | $Select.SelectAlias.SelectAlias<Query.dateUnion>
  /**
   * Select the `error` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  error?: Query.error$Expanded | $Select.SelectAlias.SelectAlias<Query.error>
  /**
   * Select the `id` field on the `Query` object. Its type is `ID` (a `Scalar`).
   */
  id?: Query.id$Expanded | $Select.SelectAlias.SelectAlias<Query.id>
  /**
   * Select the `idNonNull` field on the `Query` object. Its type is `ID` (a `Scalar`).
   */
  idNonNull?: Query.idNonNull$Expanded | $Select.SelectAlias.SelectAlias<Query.idNonNull>
  /**
   * Select the `interface` field on the `Query` object. Its type is Interface.
   */
  interface?: Query.$interface$Expanded | $Select.SelectAlias.SelectAlias<Query.$interface>
  /**
   * Select the `interfaceNonNull` field on the `Query` object. Its type is Interface.
   */
  interfaceNonNull?: Query.interfaceNonNull$Expanded | $Select.SelectAlias.SelectAlias<Query.interfaceNonNull>
  /**
   * Select the `interfaceWithArgs` field on the `Query` object. Its type is Interface.
   */
  interfaceWithArgs?: Query.interfaceWithArgs | $Select.SelectAlias.SelectAlias<Query.interfaceWithArgs>
  /**
   * Select the `listInt` field on the `Query` object. Its type is `Int` (a `Scalar`).
   */
  listInt?: Query.listInt$Expanded | $Select.SelectAlias.SelectAlias<Query.listInt>
  /**
   * Select the `listIntNonNull` field on the `Query` object. Its type is `Int` (a `Scalar`).
   */
  listIntNonNull?: Query.listIntNonNull$Expanded | $Select.SelectAlias.SelectAlias<Query.listIntNonNull>
  /**
   * Select the `listListInt` field on the `Query` object. Its type is `Int` (a `Scalar`).
   */
  listListInt?: Query.listListInt$Expanded | $Select.SelectAlias.SelectAlias<Query.listListInt>
  /**
   * Select the `listListIntNonNull` field on the `Query` object. Its type is `Int` (a `Scalar`).
   */
  listListIntNonNull?: Query.listListIntNonNull$Expanded | $Select.SelectAlias.SelectAlias<Query.listListIntNonNull>
  /**
   * Select the `lowerCaseUnion` field on the `Query` object. Its type is Union.
   */
  lowerCaseUnion?: Query.lowerCaseUnion$Expanded | $Select.SelectAlias.SelectAlias<Query.lowerCaseUnion>
  /**
   * Select the `object` field on the `Query` object. Its type is Object.
   */
  object?: Query.$object$Expanded | $Select.SelectAlias.SelectAlias<Query.$object>
  /**
   * Select the `objectList` field on the `Query` object. Its type is Object.
   */
  objectList?: Query.objectList$Expanded | $Select.SelectAlias.SelectAlias<Query.objectList>
  /**
   * Select the `objectListNonNull` field on the `Query` object. Its type is Object.
   */
  objectListNonNull?: Query.objectListNonNull$Expanded | $Select.SelectAlias.SelectAlias<Query.objectListNonNull>
  /**
   * Select the `objectNested` field on the `Query` object. Its type is Object.
   */
  objectNested?: Query.objectNested$Expanded | $Select.SelectAlias.SelectAlias<Query.objectNested>
  /**
   * Select the `objectNonNull` field on the `Query` object. Its type is Object.
   */
  objectNonNull?: Query.objectNonNull$Expanded | $Select.SelectAlias.SelectAlias<Query.objectNonNull>
  /**
   * Select the `objectWithArgs` field on the `Query` object. Its type is Object.
   */
  objectWithArgs?: Query.objectWithArgs$Expanded | $Select.SelectAlias.SelectAlias<Query.objectWithArgs>
  /**
   * Select the `result` field on the `Query` object. Its type is Union.
   */
  result?: Query.result | $Select.SelectAlias.SelectAlias<Query.result>
  /**
   * Select the `resultNonNull` field on the `Query` object. Its type is Union.
   */
  resultNonNull?: Query.resultNonNull$Expanded | $Select.SelectAlias.SelectAlias<Query.resultNonNull>
  /**
   * Select the `string` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  string?: Query.$string$Expanded | $Select.SelectAlias.SelectAlias<Query.$string>
  /**
   * Select the `stringWithArgEnum` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithArgEnum?: Query.stringWithArgEnum$Expanded | $Select.SelectAlias.SelectAlias<Query.stringWithArgEnum>
  /**
   * Select the `stringWithArgInputObject` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithArgInputObject?:
    | Query.stringWithArgInputObject$Expanded
    | $Select.SelectAlias.SelectAlias<Query.stringWithArgInputObject>
  /**
   * Select the `stringWithArgInputObjectRequired` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithArgInputObjectRequired?:
    | Query.stringWithArgInputObjectRequired
    | $Select.SelectAlias.SelectAlias<Query.stringWithArgInputObjectRequired>
  /**
   * Select the `stringWithArgs` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithArgs?: Query.stringWithArgs$Expanded | $Select.SelectAlias.SelectAlias<Query.stringWithArgs>
  /**
   * Select the `stringWithListArg` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithListArg?: Query.stringWithListArg$Expanded | $Select.SelectAlias.SelectAlias<Query.stringWithListArg>
  /**
   * Select the `stringWithListArgRequired` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithListArgRequired?:
    | Query.stringWithListArgRequired
    | $Select.SelectAlias.SelectAlias<Query.stringWithListArgRequired>
  /**
   * Select the `stringWithRequiredArg` field on the `Query` object. Its type is `String` (a `Scalar`).
   */
  stringWithRequiredArg?: Query.stringWithRequiredArg | $Select.SelectAlias.SelectAlias<Query.stringWithRequiredArg>
  /**
   * Select the `unionFooBar` field on the `Query` object. Its type is Union.
   */
  unionFooBar?: Query.unionFooBar$Expanded | $Select.SelectAlias.SelectAlias<Query.unionFooBar>
  /**
   * Select the `unionFooBarNonNull` field on the `Query` object. Its type is Union.
   */
  unionFooBarNonNull?: Query.unionFooBarNonNull$Expanded | $Select.SelectAlias.SelectAlias<Query.unionFooBarNonNull>
  /**
   * Select the `unionFooBarWithArgs` field on the `Query` object. Its type is Union.
   */
  unionFooBarWithArgs?: Query.unionFooBarWithArgs$Expanded | $Select.SelectAlias.SelectAlias<Query.unionFooBarWithArgs>
  /**
   * Select the `unionObject` field on the `Query` object. Its type is Object.
   */
  unionObject?: Query.unionObject$Expanded | $Select.SelectAlias.SelectAlias<Query.unionObject>
  /**
   * Select the `unionObjectNonNull` field on the `Query` object. Its type is Object.
   */
  unionObjectNonNull?: Query.unionObjectNonNull$Expanded | $Select.SelectAlias.SelectAlias<Query.unionObjectNonNull>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Query$FragmentInline | Query$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Query$FragmentInline extends Query, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Query {
  export type InputObjectNested$SelectionSetArguments = {
    input?: _RefDefs._InputObjectNested | undefined | null
  }
  export type InputObjectNested$SelectionSet = $Utilities.Simplify<
    $Select.Bases.Base & {
      /**
       * Arguments for `InputObjectNested` field.
       * No arguments are required so you may omit this.
       */
      $?: InputObjectNested$SelectionSetArguments
    }
  >

  /**
   * This is the "expanded" version of the `InputObjectNested` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type InputObjectNested$Expanded = $Utilities.UnionExpanded<
    $Select.Indicator.Indicator | InputObjectNested$SelectionSet
  >

  export type InputObjectNested = $Select.Indicator.Indicator | InputObjectNested$SelectionSet

  export type InputObjectNestedNonNull$SelectionSetArguments = {
    input: _RefDefs._InputObjectNestedNonNull
  }
  export interface InputObjectNestedNonNull extends $Select.Bases.Base {
    /**
     * Arguments for `InputObjectNestedNonNull` field.
     * All arguments are required so you must include this.
     */
    $: InputObjectNestedNonNull$SelectionSetArguments
  }

  /**
   * This is the "expanded" version of the `abcEnum` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type abcEnum$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type abcEnum = $Select.Indicator.NoArgsIndicator

  export type argInputObjectCircular$SelectionSetArguments = {
    input?: _RefDefs._InputObjectCircular | undefined | null
  }
  export type argInputObjectCircular$SelectionSet = $Utilities.Simplify<
    $Select.Bases.Base & {
      /**
       * Arguments for `argInputObjectCircular` field.
       * No arguments are required so you may omit this.
       */
      $?: argInputObjectCircular$SelectionSetArguments
    }
  >

  /**
   * This is the "expanded" version of the `argInputObjectCircular` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type argInputObjectCircular$Expanded = $Utilities.UnionExpanded<
    $Select.Indicator.Indicator | argInputObjectCircular$SelectionSet
  >

  export type argInputObjectCircular = $Select.Indicator.Indicator | argInputObjectCircular$SelectionSet

  /**
   * This is the "expanded" version of the `date` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type date$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type date = $Select.Indicator.NoArgsIndicator

  export type dateArg$SelectionSetArguments = {
    date?: $Scalar.DateDecoded | undefined | null
  }
  export type dateArg$SelectionSet = $Utilities.Simplify<
    $Select.Bases.Base & {
      /**
       * Arguments for `dateArg` field.
       * No arguments are required so you may omit this.
       */
      $?: dateArg$SelectionSetArguments
    }
  >

  /**
   * This is the "expanded" version of the `dateArg` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type dateArg$Expanded = $Utilities.UnionExpanded<$Select.Indicator.Indicator | dateArg$SelectionSet>

  export type dateArg = $Select.Indicator.Indicator | dateArg$SelectionSet

  export type dateArgInputObject$SelectionSetArguments = {
    input?: _RefDefs._InputObject | undefined | null
  }
  export type dateArgInputObject$SelectionSet = $Utilities.Simplify<
    $Select.Bases.Base & {
      /**
       * Arguments for `dateArgInputObject` field.
       * No arguments are required so you may omit this.
       */
      $?: dateArgInputObject$SelectionSetArguments
    }
  >

  /**
   * This is the "expanded" version of the `dateArgInputObject` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type dateArgInputObject$Expanded = $Utilities.UnionExpanded<
    $Select.Indicator.Indicator | dateArgInputObject$SelectionSet
  >

  export type dateArgInputObject = $Select.Indicator.Indicator | dateArgInputObject$SelectionSet

  export type dateArgList$SelectionSetArguments = {
    date?: Array<$Scalar.DateDecoded | undefined | null> | undefined | null
  }
  export type dateArgList$SelectionSet = $Utilities.Simplify<
    $Select.Bases.Base & {
      /**
       * Arguments for `dateArgList` field.
       * No arguments are required so you may omit this.
       */
      $?: dateArgList$SelectionSetArguments
    }
  >

  /**
   * This is the "expanded" version of the `dateArgList` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type dateArgList$Expanded = $Utilities.UnionExpanded<$Select.Indicator.Indicator | dateArgList$SelectionSet>

  export type dateArgList = $Select.Indicator.Indicator | dateArgList$SelectionSet

  export type dateArgNonNull$SelectionSetArguments = {
    date: $Scalar.DateDecoded
  }
  export interface dateArgNonNull extends $Select.Bases.Base {
    /**
     * Arguments for `dateArgNonNull` field.
     * All arguments are required so you must include this.
     */
    $: dateArgNonNull$SelectionSetArguments
  }

  export type dateArgNonNullList$SelectionSetArguments = {
    date: Array<$Scalar.DateDecoded | undefined | null>
  }
  export interface dateArgNonNullList extends $Select.Bases.Base {
    /**
     * Arguments for `dateArgNonNullList` field.
     * All arguments are required so you must include this.
     */
    $: dateArgNonNullList$SelectionSetArguments
  }

  export type dateArgNonNullListNonNull$SelectionSetArguments = {
    date: Array<$Scalar.DateDecoded | undefined | null>
  }
  export interface dateArgNonNullListNonNull extends $Select.Bases.Base {
    /**
     * Arguments for `dateArgNonNullListNonNull` field.
     * All arguments are required so you must include this.
     */
    $: dateArgNonNullListNonNull$SelectionSetArguments
  }

  export interface dateInterface1 extends _RefDefs._DateInterface1 {}
  export type dateInterface1$Expanded = dateInterface1
  /**
   * This is the "expanded" version of the `dateList` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type dateList$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type dateList = $Select.Indicator.NoArgsIndicator

  /**
   * This is the "expanded" version of the `dateListList` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type dateListList$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type dateListList = $Select.Indicator.NoArgsIndicator

  /**
   * This is the "expanded" version of the `dateListNonNull` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type dateListNonNull$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type dateListNonNull = $Select.Indicator.NoArgsIndicator

  /**
   * This is the "expanded" version of the `dateNonNull` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type dateNonNull$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type dateNonNull = $Select.Indicator.NoArgsIndicator

  export interface dateObject1 extends _RefDefs._DateObject1 {}
  export type dateObject1$Expanded = dateObject1
  export interface dateUnion extends _RefDefs._DateUnion {}
  export type dateUnion$Expanded = dateUnion
  export type error$SelectionSetArguments = {
    case?: string | undefined | null
  }
  export type error$SelectionSet = $Utilities.Simplify<
    $Select.Bases.Base & {
      /**
       * Arguments for `error` field.
       * No arguments are required so you may omit this.
       */
      $?: error$SelectionSetArguments
    }
  >

  /**
   * This is the "expanded" version of the `error` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type error$Expanded = $Utilities.UnionExpanded<$Select.Indicator.Indicator | error$SelectionSet>

  export type error = $Select.Indicator.Indicator | error$SelectionSet

  /**
   * This is the "expanded" version of the `id` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type id$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type id = $Select.Indicator.NoArgsIndicator

  /**
   * This is the "expanded" version of the `idNonNull` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type idNonNull$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type idNonNull = $Select.Indicator.NoArgsIndicator

  export interface $interface extends _RefDefs._Interface {}
  export type $interface$Expanded = $interface
  export interface interfaceNonNull extends _RefDefs._Interface {}
  export type interfaceNonNull$Expanded = interfaceNonNull
  export interface interfaceWithArgs extends _RefDefs._Interface {
    /**
     * Arguments for `interfaceWithArgs` field.
     * All arguments are required so you must include this.
     */
    $: {
      id: string
    }
  }
  export type interfaceWithArgs$Expanded = interfaceWithArgs
  /**
   * This is the "expanded" version of the `listInt` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type listInt$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type listInt = $Select.Indicator.NoArgsIndicator

  /**
   * This is the "expanded" version of the `listIntNonNull` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type listIntNonNull$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type listIntNonNull = $Select.Indicator.NoArgsIndicator

  /**
   * This is the "expanded" version of the `listListInt` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type listListInt$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type listListInt = $Select.Indicator.NoArgsIndicator

  /**
   * This is the "expanded" version of the `listListIntNonNull` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type listListIntNonNull$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type listListIntNonNull = $Select.Indicator.NoArgsIndicator

  export interface lowerCaseUnion extends _RefDefs._lowerCaseUnion {}
  export type lowerCaseUnion$Expanded = lowerCaseUnion
  export interface $object extends _RefDefs._Object1 {}
  export type $object$Expanded = $object
  export interface objectList extends _RefDefs._Object1 {}
  export type objectList$Expanded = objectList
  export interface objectListNonNull extends _RefDefs._Object1 {}
  export type objectListNonNull$Expanded = objectListNonNull
  export interface objectNested extends _RefDefs._ObjectNested {}
  export type objectNested$Expanded = objectNested
  export interface objectNonNull extends _RefDefs._Object1 {}
  export type objectNonNull$Expanded = objectNonNull
  export interface objectWithArgs extends _RefDefs._Object1 {
    /**
     * Arguments for `objectWithArgs` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      boolean?: boolean | undefined | null
      float?: number | undefined | null
      id?: string | undefined | null
      int?: number | undefined | null
      string?: string | undefined | null
    }
  }
  export type objectWithArgs$Expanded = objectWithArgs
  export interface result extends _RefDefs._Result {
    /**
     * Arguments for `result` field.
     * All arguments are required so you must include this.
     */
    $: {
      $case: _RefDefs._Case
    }
  }
  export type result$Expanded = result
  export interface resultNonNull extends _RefDefs._Result {
    /**
     * Arguments for `resultNonNull` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      $case?: _RefDefs._Case | undefined | null
    }
  }
  export type resultNonNull$Expanded = resultNonNull
  /**
   * This is the "expanded" version of the `$string` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type $string$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type $string = $Select.Indicator.NoArgsIndicator

  export type stringWithArgEnum$SelectionSetArguments = {
    $ABCEnum?: _RefDefs._ABCEnum | undefined | null
  }
  export type stringWithArgEnum$SelectionSet = $Utilities.Simplify<
    $Select.Bases.Base & {
      /**
       * Arguments for `stringWithArgEnum` field.
       * No arguments are required so you may omit this.
       */
      $?: stringWithArgEnum$SelectionSetArguments
    }
  >

  /**
   * This is the "expanded" version of the `stringWithArgEnum` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type stringWithArgEnum$Expanded = $Utilities.UnionExpanded<
    $Select.Indicator.Indicator | stringWithArgEnum$SelectionSet
  >

  export type stringWithArgEnum = $Select.Indicator.Indicator | stringWithArgEnum$SelectionSet

  export type stringWithArgInputObject$SelectionSetArguments = {
    input?: _RefDefs._InputObject | undefined | null
  }
  export type stringWithArgInputObject$SelectionSet = $Utilities.Simplify<
    $Select.Bases.Base & {
      /**
       * Arguments for `stringWithArgInputObject` field.
       * No arguments are required so you may omit this.
       */
      $?: stringWithArgInputObject$SelectionSetArguments
    }
  >

  /**
   * This is the "expanded" version of the `stringWithArgInputObject` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type stringWithArgInputObject$Expanded = $Utilities.UnionExpanded<
    $Select.Indicator.Indicator | stringWithArgInputObject$SelectionSet
  >

  export type stringWithArgInputObject = $Select.Indicator.Indicator | stringWithArgInputObject$SelectionSet

  export type stringWithArgInputObjectRequired$SelectionSetArguments = {
    input: _RefDefs._InputObject
  }
  export interface stringWithArgInputObjectRequired extends $Select.Bases.Base {
    /**
     * Arguments for `stringWithArgInputObjectRequired` field.
     * All arguments are required so you must include this.
     */
    $: stringWithArgInputObjectRequired$SelectionSetArguments
  }

  export type stringWithArgs$SelectionSetArguments = {
    boolean?: boolean | undefined | null
    float?: number | undefined | null
    id?: string | undefined | null
    int?: number | undefined | null
    string?: string | undefined | null
  }
  export type stringWithArgs$SelectionSet = $Utilities.Simplify<
    $Select.Bases.Base & {
      /**
       * Arguments for `stringWithArgs` field.
       * No arguments are required so you may omit this.
       */
      $?: stringWithArgs$SelectionSetArguments
    }
  >

  /**
   * This is the "expanded" version of the `stringWithArgs` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type stringWithArgs$Expanded = $Utilities.UnionExpanded<
    $Select.Indicator.Indicator | stringWithArgs$SelectionSet
  >

  export type stringWithArgs = $Select.Indicator.Indicator | stringWithArgs$SelectionSet

  export type stringWithListArg$SelectionSetArguments = {
    ints?: Array<number | undefined | null> | undefined | null
  }
  export type stringWithListArg$SelectionSet = $Utilities.Simplify<
    $Select.Bases.Base & {
      /**
       * Arguments for `stringWithListArg` field.
       * No arguments are required so you may omit this.
       */
      $?: stringWithListArg$SelectionSetArguments
    }
  >

  /**
   * This is the "expanded" version of the `stringWithListArg` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type stringWithListArg$Expanded = $Utilities.UnionExpanded<
    $Select.Indicator.Indicator | stringWithListArg$SelectionSet
  >

  export type stringWithListArg = $Select.Indicator.Indicator | stringWithListArg$SelectionSet

  export type stringWithListArgRequired$SelectionSetArguments = {
    ints: Array<number | undefined | null>
  }
  export interface stringWithListArgRequired extends $Select.Bases.Base {
    /**
     * Arguments for `stringWithListArgRequired` field.
     * All arguments are required so you must include this.
     */
    $: stringWithListArgRequired$SelectionSetArguments
  }

  export type stringWithRequiredArg$SelectionSetArguments = {
    string: string
  }
  export interface stringWithRequiredArg extends $Select.Bases.Base {
    /**
     * Arguments for `stringWithRequiredArg` field.
     * All arguments are required so you must include this.
     */
    $: stringWithRequiredArg$SelectionSetArguments
  }

  export interface unionFooBar extends _RefDefs._FooBarUnion {}
  export type unionFooBar$Expanded = unionFooBar
  export interface unionFooBarNonNull extends _RefDefs._FooBarUnion {}
  export type unionFooBarNonNull$Expanded = unionFooBarNonNull
  export interface unionFooBarWithArgs extends _RefDefs._FooBarUnion {
    /**
     * Arguments for `unionFooBarWithArgs` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      id?: string | undefined | null
    }
  }
  export type unionFooBarWithArgs$Expanded = unionFooBarWithArgs
  export interface unionObject extends _RefDefs._ObjectUnion {}
  export type unionObject$Expanded = unionObject
  export interface unionObjectNonNull extends _RefDefs._ObjectUnion {}
  export type unionObjectNonNull$Expanded = unionObjectNonNull
}

//
//
//
//
//
//
// ==================================================================================================
//                                       GraphQLEnumType Types
// ==================================================================================================
//
//
//
//
//
//

/**
 * Enum documentation.
 *
 * Members
 * "A" - (DEPRECATED: Enum value A is deprecated.)
 * "B" - Enum B member documentation.
 * "C" - (DEPRECATED: Enum value C is deprecated.)
 */
export type ABCEnum = 'A' | 'B' | 'C'

export type Case = 'ErrorOne' | 'ErrorTwo' | 'Object1'

//
//
//
//
//
//
// ==================================================================================================
//                                    GraphQLInputObjectType Types
// ==================================================================================================
//
//
//
//
//
//

export interface InputObject {
  date?: $Scalar.DateDecoded | undefined | null
  dateRequired: $Scalar.DateDecoded
  id?: string | undefined | null
  idRequired: string
}

export interface InputObjectCircular {
  circular?: _RefDefs._InputObjectCircular | undefined | null
  date?: $Scalar.DateDecoded | undefined | null
}

export interface InputObjectNested {
  InputObject?: _RefDefs._InputObject | undefined | null
}

export interface InputObjectNestedNonNull {
  InputObject: _RefDefs._InputObject
}

//
//
//
//
//
//
// ==================================================================================================
//                                     GraphQLInterfaceType Types
// ==================================================================================================
//
//
//
//
//
//

// --------------
// Interface Type DateInterface1
// --------------

export interface DateInterface1 extends $Select.Bases.ObjectLike {
  date1?: DateInterface1.date1
  ___on_DateObject1?: DateObject1

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: DateInterface1$FragmentInline | DateInterface1$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a interface type and thus polymorphic,
   * the name is one of the implementor type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface DateInterface1$FragmentInline
  extends DateInterface1, $Select.Directive.$Groups.InlineFragment.Fields
{}

export namespace DateInterface1 {
  /**
   * This is the "expanded" version of the `date1` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type date1$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type date1 = $Select.Indicator.NoArgsIndicator
}

// --------------
// Interface Type Error
// --------------

export interface Error extends $Select.Bases.ObjectLike {
  message?: Error.message
  ___on_ErrorOne?: ErrorOne
  ___on_ErrorTwo?: ErrorTwo

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Error$FragmentInline | Error$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a interface type and thus polymorphic,
   * the name is one of the implementor type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Error$FragmentInline extends Error, $Select.Directive.$Groups.InlineFragment.Fields {}

export namespace Error {
  /**
   * This is the "expanded" version of the `message` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type message$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type message = $Select.Indicator.NoArgsIndicator
}

// --------------
// Interface Type Interface
// --------------

export interface Interface extends $Select.Bases.ObjectLike {
  id?: Interface.id
  ___on_Object1ImplementingInterface?: Object1ImplementingInterface
  ___on_Object2ImplementingInterface?: Object2ImplementingInterface

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Interface$FragmentInline | Interface$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a interface type and thus polymorphic,
   * the name is one of the implementor type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Interface$FragmentInline extends Interface, $Select.Directive.$Groups.InlineFragment.Fields {}

export namespace Interface {
  /**
   * This is the "expanded" version of the `id` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type id$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type id = $Select.Indicator.NoArgsIndicator
}

//
//
//
//
//
//
// ==================================================================================================
//                                      GraphQLObjectType Types
// ==================================================================================================
//
//
//
//
//
//

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                                Bar
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Bar extends $Select.Bases.ObjectLike {
  /**
   * Select the `int` field on the `Bar` object. Its type is `Int` (a `Scalar`).
   */
  int?: Bar.int$Expanded | $Select.SelectAlias.SelectAlias<Bar.int>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Bar$FragmentInline | Bar$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Bar$FragmentInline extends Bar, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Bar {
  /**
   * This is the "expanded" version of the `int` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type int$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type int = $Select.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                            DateObject1
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface DateObject1 extends $Select.Bases.ObjectLike {
  /**
   * Select the `date1` field on the `DateObject1` object. Its type is `Date` (a `Scalar`).
   */
  date1?: DateObject1.date1$Expanded | $Select.SelectAlias.SelectAlias<DateObject1.date1>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: DateObject1$FragmentInline | DateObject1$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface DateObject1$FragmentInline extends DateObject1, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace DateObject1 {
  /**
   * This is the "expanded" version of the `date1` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type date1$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type date1 = $Select.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                            DateObject2
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface DateObject2 extends $Select.Bases.ObjectLike {
  /**
   * Select the `date2` field on the `DateObject2` object. Its type is `Date` (a `Scalar`).
   */
  date2?: DateObject2.date2$Expanded | $Select.SelectAlias.SelectAlias<DateObject2.date2>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: DateObject2$FragmentInline | DateObject2$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface DateObject2$FragmentInline extends DateObject2, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace DateObject2 {
  /**
   * This is the "expanded" version of the `date2` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type date2$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type date2 = $Select.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                              ErrorOne
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface ErrorOne extends $Select.Bases.ObjectLike {
  /**
   * Select the `infoId` field on the `ErrorOne` object. Its type is `ID` (a `Scalar`).
   */
  infoId?: ErrorOne.infoId$Expanded | $Select.SelectAlias.SelectAlias<ErrorOne.infoId>
  /**
   * Select the `message` field on the `ErrorOne` object. Its type is `String` (a `Scalar`).
   */
  message?: ErrorOne.message$Expanded | $Select.SelectAlias.SelectAlias<ErrorOne.message>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: ErrorOne$FragmentInline | ErrorOne$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface ErrorOne$FragmentInline extends ErrorOne, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace ErrorOne {
  /**
   * This is the "expanded" version of the `infoId` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type infoId$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type infoId = $Select.Indicator.NoArgsIndicator

  /**
   * This is the "expanded" version of the `message` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type message$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type message = $Select.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                              ErrorTwo
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface ErrorTwo extends $Select.Bases.ObjectLike {
  /**
   * Select the `infoInt` field on the `ErrorTwo` object. Its type is `Int` (a `Scalar`).
   */
  infoInt?: ErrorTwo.infoInt$Expanded | $Select.SelectAlias.SelectAlias<ErrorTwo.infoInt>
  /**
   * Select the `message` field on the `ErrorTwo` object. Its type is `String` (a `Scalar`).
   */
  message?: ErrorTwo.message$Expanded | $Select.SelectAlias.SelectAlias<ErrorTwo.message>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: ErrorTwo$FragmentInline | ErrorTwo$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface ErrorTwo$FragmentInline extends ErrorTwo, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace ErrorTwo {
  /**
   * This is the "expanded" version of the `infoInt` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type infoInt$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type infoInt = $Select.Indicator.NoArgsIndicator

  /**
   * This is the "expanded" version of the `message` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type message$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type message = $Select.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                                Foo
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

/**
 * Object documentation.
 */
export interface Foo extends $Select.Bases.ObjectLike {
  /**
   * Select the `id` field on the `Foo` object. Its type is `ID` (a `Scalar`).
   */
  id?: Foo.id$Expanded | $Select.SelectAlias.SelectAlias<Foo.id>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Foo$FragmentInline | Foo$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Foo$FragmentInline extends Foo, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Foo {
  /**
   * This is the "expanded" version of the `id` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type id$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type id = $Select.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                              Object1
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Object1 extends $Select.Bases.ObjectLike {
  /**
   * Select the `boolean` field on the `Object1` object. Its type is `Boolean` (a `Scalar`).
   */
  boolean?: Object1.$boolean$Expanded | $Select.SelectAlias.SelectAlias<Object1.$boolean>
  /**
   * Select the `float` field on the `Object1` object. Its type is `Float` (a `Scalar`).
   */
  float?: Object1.float$Expanded | $Select.SelectAlias.SelectAlias<Object1.float>
  /**
   * Select the `id` field on the `Object1` object. Its type is `ID` (a `Scalar`).
   */
  id?: Object1.id$Expanded | $Select.SelectAlias.SelectAlias<Object1.id>
  /**
   * Select the `int` field on the `Object1` object. Its type is `Int` (a `Scalar`).
   */
  int?: Object1.int$Expanded | $Select.SelectAlias.SelectAlias<Object1.int>
  /**
   * Select the `string` field on the `Object1` object. Its type is `String` (a `Scalar`).
   */
  string?: Object1.$string$Expanded | $Select.SelectAlias.SelectAlias<Object1.$string>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Object1$FragmentInline | Object1$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Object1$FragmentInline extends Object1, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Object1 {
  /**
   * This is the "expanded" version of the `$boolean` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type $boolean$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type $boolean = $Select.Indicator.NoArgsIndicator

  /**
   * This is the "expanded" version of the `float` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type float$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type float = $Select.Indicator.NoArgsIndicator

  /**
   * This is the "expanded" version of the `id` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type id$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type id = $Select.Indicator.NoArgsIndicator

  /**
   * This is the "expanded" version of the `int` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type int$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type int = $Select.Indicator.NoArgsIndicator

  /**
   * This is the "expanded" version of the `$string` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type $string$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type $string = $Select.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                    Object1ImplementingInterface
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Object1ImplementingInterface extends $Select.Bases.ObjectLike {
  /**
   * Select the `id` field on the `Object1ImplementingInterface` object. Its type is `ID` (a `Scalar`).
   */
  id?: Object1ImplementingInterface.id$Expanded | $Select.SelectAlias.SelectAlias<Object1ImplementingInterface.id>
  /**
   * Select the `int` field on the `Object1ImplementingInterface` object. Its type is `Int` (a `Scalar`).
   */
  int?: Object1ImplementingInterface.int$Expanded | $Select.SelectAlias.SelectAlias<Object1ImplementingInterface.int>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Object1ImplementingInterface$FragmentInline | Object1ImplementingInterface$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Object1ImplementingInterface$FragmentInline
  extends Object1ImplementingInterface, $Select.Directive.$Groups.InlineFragment.Fields
{}

// ----------------------------------------| Fields Interfaces |

export namespace Object1ImplementingInterface {
  /**
   * This is the "expanded" version of the `id` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type id$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type id = $Select.Indicator.NoArgsIndicator

  /**
   * This is the "expanded" version of the `int` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type int$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type int = $Select.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                    Object2ImplementingInterface
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Object2ImplementingInterface extends $Select.Bases.ObjectLike {
  /**
   * Select the `boolean` field on the `Object2ImplementingInterface` object. Its type is `Boolean` (a `Scalar`).
   */
  boolean?:
    | Object2ImplementingInterface.$boolean$Expanded
    | $Select.SelectAlias.SelectAlias<Object2ImplementingInterface.$boolean>
  /**
   * Select the `id` field on the `Object2ImplementingInterface` object. Its type is `ID` (a `Scalar`).
   */
  id?: Object2ImplementingInterface.id$Expanded | $Select.SelectAlias.SelectAlias<Object2ImplementingInterface.id>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Object2ImplementingInterface$FragmentInline | Object2ImplementingInterface$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Object2ImplementingInterface$FragmentInline
  extends Object2ImplementingInterface, $Select.Directive.$Groups.InlineFragment.Fields
{}

// ----------------------------------------| Fields Interfaces |

export namespace Object2ImplementingInterface {
  /**
   * This is the "expanded" version of the `$boolean` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type $boolean$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type $boolean = $Select.Indicator.NoArgsIndicator

  /**
   * This is the "expanded" version of the `id` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type id$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type id = $Select.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                            ObjectNested
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface ObjectNested extends $Select.Bases.ObjectLike {
  /**
   * Select the `id` field on the `ObjectNested` object. Its type is `ID` (a `Scalar`).
   */
  id?: ObjectNested.id$Expanded | $Select.SelectAlias.SelectAlias<ObjectNested.id>
  /**
   * Select the `object` field on the `ObjectNested` object. Its type is Object.
   */
  object?: ObjectNested.$object$Expanded | $Select.SelectAlias.SelectAlias<ObjectNested.$object>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: ObjectNested$FragmentInline | ObjectNested$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface ObjectNested$FragmentInline extends ObjectNested, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace ObjectNested {
  /**
   * This is the "expanded" version of the `id` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type id$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type id = $Select.Indicator.NoArgsIndicator

  export interface $object extends _RefDefs._Object1 {}
  export type $object$Expanded = $object
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                            ObjectUnion
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface ObjectUnion extends $Select.Bases.ObjectLike {
  /**
   * Select the `fooBarUnion` field on the `ObjectUnion` object. Its type is Union.
   */
  fooBarUnion?: ObjectUnion.fooBarUnion$Expanded | $Select.SelectAlias.SelectAlias<ObjectUnion.fooBarUnion>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: ObjectUnion$FragmentInline | ObjectUnion$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface ObjectUnion$FragmentInline extends ObjectUnion, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace ObjectUnion {
  export interface fooBarUnion extends _RefDefs._FooBarUnion {}
  export type fooBarUnion$Expanded = fooBarUnion
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                          lowerCaseObject
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface lowerCaseObject extends $Select.Bases.ObjectLike {
  /**
   * Select the `id` field on the `lowerCaseObject` object. Its type is `ID` (a `Scalar`).
   */
  id?: lowerCaseObject.id$Expanded | $Select.SelectAlias.SelectAlias<lowerCaseObject.id>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: lowerCaseObject$FragmentInline | lowerCaseObject$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface lowerCaseObject$FragmentInline
  extends lowerCaseObject, $Select.Directive.$Groups.InlineFragment.Fields
{}

// ----------------------------------------| Fields Interfaces |

export namespace lowerCaseObject {
  /**
   * This is the "expanded" version of the `id` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type id$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type id = $Select.Indicator.NoArgsIndicator
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                          lowerCaseObject2
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface lowerCaseObject2 extends $Select.Bases.ObjectLike {
  /**
   * Select the `int` field on the `lowerCaseObject2` object. Its type is `Int` (a `Scalar`).
   */
  int?: lowerCaseObject2.int$Expanded | $Select.SelectAlias.SelectAlias<lowerCaseObject2.int>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: lowerCaseObject2$FragmentInline | lowerCaseObject2$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface lowerCaseObject2$FragmentInline
  extends lowerCaseObject2, $Select.Directive.$Groups.InlineFragment.Fields
{}

// ----------------------------------------| Fields Interfaces |

export namespace lowerCaseObject2 {
  /**
   * This is the "expanded" version of the `int` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type int$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type int = $Select.Indicator.NoArgsIndicator
}

//
//
//
//
//
//
// ==================================================================================================
//                                       GraphQLUnionType Types
// ==================================================================================================
//
//
//
//
//
//

export interface DateUnion {
  ___on_DateObject1?: DateObject1
  ___on_DateObject2?: DateObject2

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: DateUnion$FragmentInline | DateUnion$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a union type and thus polymorphic,
   * the name is one of the member type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}
export interface DateUnion$FragmentInline extends DateUnion, $Select.Directive.$Groups.InlineFragment.Fields {}

/**
 * Union documentation.
 */
export interface FooBarUnion {
  ___on_Bar?: Bar
  ___on_Foo?: Foo

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: FooBarUnion$FragmentInline | FooBarUnion$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a union type and thus polymorphic,
   * the name is one of the member type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}
export interface FooBarUnion$FragmentInline extends FooBarUnion, $Select.Directive.$Groups.InlineFragment.Fields {}

export interface Result {
  ___on_ErrorOne?: ErrorOne
  ___on_ErrorTwo?: ErrorTwo
  ___on_Object1?: Object1

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Result$FragmentInline | Result$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a union type and thus polymorphic,
   * the name is one of the member type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}
export interface Result$FragmentInline extends Result, $Select.Directive.$Groups.InlineFragment.Fields {}

export interface lowerCaseUnion {
  ___on_lowerCaseObject?: lowerCaseObject
  ___on_lowerCaseObject2?: lowerCaseObject2

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: lowerCaseUnion$FragmentInline | lowerCaseUnion$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a union type and thus polymorphic,
   * the name is one of the member type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}
export interface lowerCaseUnion$FragmentInline
  extends lowerCaseUnion, $Select.Directive.$Groups.InlineFragment.Fields
{}

/**
 * [1] These definitions serve to allow field selection interfaces to extend their respective object type without
 *     name clashing between the field name and the object name.
 *
 *     For example imagine `Query.Foo` field with type also called `Foo`. Our generated interfaces for each field
 *     would end up with an error of `export interface Foo extends Foo ...`
 */
export namespace _RefDefs {
  export type _Mutation = Mutation
  export type _Query = Query
  export type _ABCEnum = ABCEnum
  export type _Case = Case
  export type _InputObject = InputObject
  export type _InputObjectCircular = InputObjectCircular
  export type _InputObjectNested = InputObjectNested
  export type _InputObjectNestedNonNull = InputObjectNestedNonNull
  export type _DateInterface1 = DateInterface1
  export type _Error = Error
  export type _Interface = Interface
  export type _Bar = Bar
  export type _DateObject1 = DateObject1
  export type _DateObject2 = DateObject2
  export type _ErrorOne = ErrorOne
  export type _ErrorTwo = ErrorTwo
  export type _Foo = Foo
  export type _Object1 = Object1
  export type _Object1ImplementingInterface = Object1ImplementingInterface
  export type _Object2ImplementingInterface = Object2ImplementingInterface
  export type _ObjectNested = ObjectNested
  export type _ObjectUnion = ObjectUnion
  export type _lowerCaseObject = lowerCaseObject
  export type _lowerCaseObject2 = lowerCaseObject2
  export type _DateUnion = DateUnion
  export type _FooBarUnion = FooBarUnion
  export type _Result = Result
  export type _lowerCaseUnion = lowerCaseUnion
}
