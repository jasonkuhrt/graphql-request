import type { Grafaid } from '../../../lib/grafaid/__.js'
import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import type { Scalar } from '../../1_Schema/_.js'
import { isScalar } from '../../1_Schema/Hybrid/types/Scalar/Scalar.js'
import type { SchemaDrivenDataMap } from '../../7_customScalars/generator/SchemaDrivenDataMap.js'
import { type Context, type GraphQLPostOperationMapper } from '../types.js'

export const toGraphQLValue: ValueMapper = (context, sddm, value) => {
  // todo remove? unused.
  // const hookResult = context.hooks?.value?.(context, index, value)
  // if (hookResult) return hookResult

  if (isScalar(sddm?.nt)) {
    return applyScalar(context, sddm.nt, value)
  }

  if (value === null) {
    return Nodes.NullValue()
  }

  if (Array.isArray(value)) {
    return Nodes.ListValue({
      values: value.map(oneValue =>
        toGraphQLValue(
          context,
          sddm,
          oneValue,
        )
      ),
    })
  }

  if (typeof value === `object`) {
    const sddmInputObject = sddm?.nt
    return Nodes.ObjectValue({
      fields: Object.entries(value).map(([fieldName, fieldValue]) => {
        return Nodes.ObjectField({
          name: Nodes.Name({ value: fieldName }),
          value: toGraphQLValue(context, sddmInputObject?.f?.[fieldName], fieldValue),
        })
      }),
    })
  }

  if (typeof value === `string`) {
    if (context.value.isEnum) {
      return Nodes.EnumValue({ value: String(value) })
    }
    return Nodes.StringValue({ value })
  }

  if (typeof value === `boolean`) {
    return Nodes.BooleanValue({ value })
  }

  if (typeof value === `number`) {
    return Nodes.FloatValue({ value: String(value) })
  }

  throw new Error(`Unsupported value: ${String(value)}`)
}

export type ValueMapper = GraphQLPostOperationMapper<
  SchemaDrivenDataMap.ArgumentOrInputField,
  Grafaid.Nodes.ValueNode,
  [value: unknown],
  AdditionalContext
>

interface AdditionalContext {
  value: {
    isEnum: boolean
  }
}

const applyScalar = (
  context: Context & AdditionalContext,
  scalar: Scalar.Scalar,
  value: unknown,
): Grafaid.Nodes.ValueNode => {
  if (value === null) return Nodes.NullValue()

  if (Array.isArray(value)) {
    return Nodes.ListValue({
      values: value.map(oneValue => applyScalar(context, scalar, oneValue)),
    })
  }

  const valueEncoded = scalar.codec.encode(value)

  return toGraphQLValue(context, undefined, valueEncoded)
}
