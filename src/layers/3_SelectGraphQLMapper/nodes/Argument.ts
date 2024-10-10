import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import { Select } from '../../2_Select/__.js'
import type { SchemaDrivenDataMap } from '../../7_customScalars/generator/SchemaDrivenDataMap.js'
import { type GraphQLPostOperationMapper } from '../types.js'
import { toGraphQLValue } from './Value.js'

export interface Argument {
  name: string
  value: Select.Arguments.ArgValue
}

export const toGraphQLArgument: GraphQLPostOperationMapper<
  SchemaDrivenDataMap.ArgumentOrInputField,
  Nodes.ArgumentNode,
  [arg: Argument]
> = (
  context,
  sddm,
  arg,
) => {
  // return Nodes.Variable({ name: Nodes.Name({ value: `abc` }) })
  const valueContext = { ...context, value: { isEnum: Select.Arguments.isEnumKey(arg.name) } }
  const value = toGraphQLValue(valueContext, sddm, arg.value)

  const name = Nodes.Name({ value: arg.name.replace(Select.Arguments.enumKeyPrefixPattern, ``) })

  return Nodes.Argument({
    name,
    value,
  })
}
