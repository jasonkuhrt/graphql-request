import type { Grafaid } from '../../../lib/grafaid/__.js'
import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import type { Select } from '../../2_Select/__.js'
import type { SchemaDrivenDataMap } from '../../7_customScalars/generator/SchemaDrivenDataMap.js'
import { inferTypeName } from '../inferVariableTypeName.js'
import type { Options } from '../toGraphQL.js'
import type { Context, GraphQLPreOperationMapper } from '../types.js'
import { toGraphQLSelectionSetRoot } from './GraffleSelectionSetRoot.js'

export const toGraphQLOperationDefinition: GraphQLPreOperationMapper<
  SchemaDrivenDataMap.OutputObject,
  { operation: Nodes.OperationDefinitionNode; variables: Grafaid.Variables },
  [operation: Select.Document.OperationNormalized, options?: Options]
> = (
  sddm,
  operation,
  options,
) => {
  const context: Context = {
    extractOperationVariables: options?.extractOperationVariables ?? true,
    captureVariableForArgument: (input) => {
      const variableName = input.name

      context.captures.variables.push({
        name: variableName,
        typeName: inferTypeName(input.sddmArgument),
        value: input.value,
      })

      return Nodes.Argument({
        name: Nodes.Name({ value: input.name }),
        value: Nodes.Variable({
          name: Nodes.Name({ value: variableName }),
        }),
      })
    },
    captures: {
      variables: [],
    },
  }

  const name = operation.name
    ? Nodes.Name({ value: operation.name })
    : undefined

  const selectionSet = toGraphQLSelectionSetRoot(context, sddm, operation.selectionSet)

  const variableDefinitions = context.captures.variables.map((captured) => {
    return Nodes.VariableDefinition({
      variable: Nodes.Variable({ name: Nodes.Name({ value: captured.name }) }),
      type: Nodes.NamedType({ name: Nodes.Name({ value: captured.typeName }) }),
    })
  })

  const graphqlOperation = Nodes.OperationDefinition({
    operation: operation.type,
    name,
    selectionSet,
    variableDefinitions,
    // todo support directives on operations ??? Check what this feature/capability is about
    // directives
  })

  const variables: Grafaid.Variables = Object.fromEntries(context.captures.variables.map(_ => {
    return [_.name, _.value as any]
  }))

  return {
    operation: graphqlOperation,
    variables,
  }
}
