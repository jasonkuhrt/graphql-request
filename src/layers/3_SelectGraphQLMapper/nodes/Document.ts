import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import type { Select } from '../../2_Select/__.js'
import type { SchemaDrivenDataMap } from '../../7_customScalars/generator/SchemaDrivenDataMap.js'
import type { Options } from '../toGraphQL.js'
import { toGraphQLOperationDefinition } from './OperationDefinition.js'

const defaultOperationName = `$default`

export const toGraphQLDocument = (
  document: Select.Document.DocumentNormalized,
  options?: Options,
) => {
  const operations = Object.values(document.operations)
  const sddm: SchemaDrivenDataMap = options?.sddm ?? {}

  const operationsAndVariables = operations.map(operation => {
    return toGraphQLOperationDefinition(sddm[operation.rootType], operation, options)
  })

  const graphqlDocument = Nodes.Document({
    definitions: operationsAndVariables.map(_ => _.operation),
  })

  const operationsVariables = Object.fromEntries(operationsAndVariables.map(_ => {
    return [_.operation.name ?? defaultOperationName, _.variables]
  }))

  return {
    document: graphqlDocument,
    operationsVariables,
  }
}
