import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import { Select } from '../../2_Select/__.js'
import { SchemaDrivenDataMap } from '../../7_customScalars/generator/SchemaDrivenDataMap.js'
import { type Field } from '../types.js'
import type { GraphQLPostOperationMapper } from '../types.js'
import { collectForInlineFragmentLike } from './_collect.js'
import { toGraphQLArgument } from './Argument.js'

export const toGraphQLField: GraphQLPostOperationMapper<
  SchemaDrivenDataMap.OutputField,
  Nodes.FieldNode | null,
  [field: Field]
> = (
  context,
  sddm,
  field,
) => {
  const sddmNamedType = sddm?.nt
  const fieldSelection = Select.parseSelectionField(field.name, field.value)

  const alias = field.alias
    ? Nodes.Name({ value: field.alias })
    : undefined

  if (fieldSelection.type === `Indicator`) {
    if (!fieldSelection.select) return null
    return Nodes.Field({
      name: Nodes.Name({ value: field.name }),
      alias,
    })
  }

  const arguments_: Nodes.ArgumentNode[] = []
  const directives: Nodes.DirectiveNode[] = []
  const selections: Nodes.SelectionNode[] = []

  for (const key in fieldSelection.selectionSet) {
    const keyParsed = Select.parseSelection(key, fieldSelection.selectionSet[key])
    switch (keyParsed.type) {
      case `Arguments`: {
        const sddmArguments = sddm?.a
        for (const argName in keyParsed.arguments) {
          const sddmArgument = sddmArguments?.[argName]
          const argValue = keyParsed.arguments[argName]

          if (context.extractOperationVariables && sddmArgument) {
            const argument = context.captureVariableForArgument({
              name: argName,
              value: argValue,
              sddmArgument,
            })
            arguments_.push(argument)
          } else {
            const argument = toGraphQLArgument(context, sddmArgument, { name: argName, value: argValue })
            arguments_.push(argument)
          }
        }
        continue
      }
      default: {
        // dprint-ignore
        if (SchemaDrivenDataMap.isScalar(sddmNamedType)) throw new Error(`schema map scalar on non-scalar graffle selection.`)
        collectForInlineFragmentLike(context, sddmNamedType, keyParsed, {
          directives,
          selections,
        })
      }
    }
  }

  return Nodes.Field({
    name: Nodes.Name({
      value: field.name,
    }),
    alias,
    arguments: arguments_,
    directives,
    selectionSet: Nodes.SelectionSet({
      selections,
    }),
  })
}
