import type { Grafaid } from '../../lib/grafaid/__.js'
import { Nodes, operationTypeNameToRootTypeName } from '../../lib/grafaid/graphql.js'
import type { SchemaIndex } from '../4_generator/generators/SchemaIndex.js'

export const injectTypenameOnRootResultFields = (
  { document, operationName, schema }: {
    operationName?: string | undefined
    schema: SchemaIndex
    document: Nodes.DocumentNode
  },
): void => {
  const operationDefinition = document.definitions.find(_ =>
    _.kind === Nodes.Kind.OPERATION_DEFINITION && (operationName ? _.name?.value === operationName : true)
  ) as Nodes.OperationDefinitionNode | undefined

  if (!operationDefinition) {
    throw new Error(`Operation not found`)
  }

  injectTypenameOnRootResultFields_({
    rootTypeName: operationTypeNameToRootTypeName[operationDefinition.operation],
    schema,
    selectionSet: operationDefinition.selectionSet,
  })
}

const injectTypenameOnRootResultFields_ = (
  { selectionSet, schema, rootTypeName }: {
    schema: SchemaIndex
    rootTypeName: Grafaid.Schema.RootTypeName
    selectionSet: Nodes.SelectionSetNode
  },
): void => {
  for (const selection of selectionSet.selections) {
    switch (selection.kind) {
      case Nodes.Kind.FIELD: {
        if (schema.error.rootResultFields[rootTypeName][selection.name.value]) {
          // @ts-expect-error selections is typed as readonly
          // @see https://github.com/graphql/graphql-js/discussions/4212
          selection.selectionSet?.selections.push(Nodes.Field({ name: Nodes.Name({ value: `__typename` }) }))
        }
        continue
      }
      case Nodes.Kind.INLINE_FRAGMENT: {
        injectTypenameOnRootResultFields_({
          rootTypeName,
          schema,
          selectionSet: selection.selectionSet,
        })
      }
    }
  }
}
