import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import { getFromEnumLooselyOrThrow } from '../../../lib/prelude.js'
import { Select } from '../../2_Select/__.js'
import type { SchemaDrivenDataMap } from '../../7_customScalars/generator/SchemaDrivenDataMap.js'
import type { GraphQLPostOperationMapper } from '../types.js'
import { toGraphQLValue } from './Value.js'

export const toGraphQLDirective: GraphQLPostOperationMapper<
  | SchemaDrivenDataMap.OutputField // field directive
  | SchemaDrivenDataMap.OutputObject, // inline-fragment directive
  Nodes.DirectiveNode | null,
  [directive: Select.ParsedSelectionDirective]
> = (
  context,
  sddm,
  directive,
) => {
  if (directive.arguments === null) return null

  const definition = getFromEnumLooselyOrThrow(Select.Directive.definitionsByName, directive.name)

  const arguments_: Nodes.ArgumentNode[] = []

  for (const argumentName in directive.arguments.parsed) {
    const argumentValue = directive.arguments.parsed[argumentName]
    const argumentType = definition.type.arguments[argumentName]?.type
    if (argumentType === undefined) {
      throw new Error(`Argument ${argumentName} is required`)
    }

    const value = toGraphQLValue(
      { ...context, value: { isEnum: false } },
      sddm,
      argumentValue,
    )

    const name = Nodes.Name({ value: argumentName })
    // todo: we need sddm definition for directives
    // context.captures.variables.push({
    //   name: argumentName,
    //   value: argumentValue,
    //   typeName: argumentType.name,
    // })
    arguments_.push(Nodes.Argument({
      name,
      value,
    }))
  }

  return Nodes.Directive({
    name: Nodes.Name({ value: directive.name }),
    arguments: arguments_,
  })
}
