import type { Grafaid } from '../../../lib/grafaid/__.js'
import { Scalar, type Scalar as SchemaScalar } from '../../1_Schema/_.js'

export interface SchemaDrivenDataMap {
  [Grafaid.Schema.RootTypeName.Mutation]?: SchemaDrivenDataMap.OutputObject
  [Grafaid.Schema.RootTypeName.Query]?: SchemaDrivenDataMap.OutputObject
  [Grafaid.Schema.RootTypeName.Subscription]?: SchemaDrivenDataMap.OutputObject
}

export namespace SchemaDrivenDataMap {
  export type OutputLike = SchemaScalar.Scalar | OutputObject

  export type InputLike = SchemaScalar.Scalar | InputObject

  export type Node =
    | OutputObject
    | InputObject
    | ArgumentsOrInputObjectFields
    | ArgumentOrInputField
    | InlineType
    | SchemaDrivenDataMap
    | Scalar

  export interface OutputObject {
    f: {
      [key: string]: OutputField
    }
  }

  export const isScalar = Scalar.isScalar

  export const isOutputObject = (node?: Node): node is OutputObject => {
    return node ? `f` in node : false
  }

  export interface OutputField {
    /**
     * The field's arguments, if any.
     *
     * Present when one of:
     * - operationVariables is enabled and field has arguments.
     * - customScalars is enabled and field has arguments that contain custom scalars.
     */
    a?: ArgumentsOrInputObjectFields
    /**
     * The field's output type.
     *
     * Present when/as one of:
     * - `CodecString` when customScalars enabled and this field's named type is a custom scalar.
     * - `OutputObject` when customScalars enabled and this field's type contains custom scalars.
     */
    nt?: OutputLike
  }
  export const isOutputField = (node?: Node): node is OutputField => {
    return node ? `a` in node : false
  }

  export interface ArgumentsOrInputObjectFields {
    [key: string]: ArgumentOrInputField
  }

  export interface ArgumentOrInputField {
    /**
     * Inline types (nullable/non-nullable, list) of this argument or input field. Only present when operationVariables is enabled.
     */
    it?: InlineType
    /**
     * Named type of this argument or input field. Only present when customScalars is enabled.
     */
    nt?: InputLike
  }

  /**
   * Inline types for a field-like (directive argument, field argument, input/output field) type.
   *
   * Nested tuple. Each nesting represents a list. First tuple member represents nullability of the list.
   *
   * The outer most tuple represents not a list but the nullability for the named type itself. E.g. `[0]` would indicate
   * that a scalar field is nullable while `[1]` would indicate that it is non-nullable.
   */
  export type InlineType = [Nullable | NonNull, InlineType?]

  export type Nullable = 0

  export type NonNull = 1

  export interface InputObject {
    /**
     * Name of the input object. Only present when operationVariables is enabled.
     */
    n?: string
    /**
     * Fields of the input object.
     */
    f?: {
      [key: string]: ArgumentOrInputField
    }
  }

  export type Scalar = SchemaScalar.Scalar
}
