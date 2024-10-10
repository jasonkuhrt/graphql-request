import { Kind, parse } from 'graphql'
import type { Grafaid } from '../../lib/grafaid/__.js'
import { operationTypeNameToRootTypeName, parseOperationType } from '../../lib/grafaid/graphql.js'
import { unType } from '../../lib/grafaid/typed-document/TypedDocument.js'
import { isString } from '../../lib/prelude.js'
import type { CodecString } from '../3_SelectGraphQLMapper/types.js'
import type { SchemaDrivenDataMap } from './generator/SchemaDrivenDataMap.js'

/**
 * If a document is given then aliases will be decoded as well.
 */
export const decodeCustomScalars = (input: {
  data: Grafaid.SomeData | null | undefined
  sddm: SchemaDrivenDataMap
  request: Grafaid.RequestInput
}) => {
  const rootType = parseOperationType(input.request)
  if (!rootType) return

  const sddmOutputObject = input.sddm[operationTypeNameToRootTypeName[rootType]]
  if (!sddmOutputObject) return

  const queryUntyped = unType(input.request.query)
  // todo expose an option to optimize string interface by not parsing it. Explain the caveat of losing support for custom scalars in aliased positions.
  // const document = isString(queryUntyped) ? null : queryUntyped
  const document = (isString(queryUntyped) ? parse(queryUntyped) : queryUntyped) as Grafaid.Nodes.DocumentNode | null
  const documentOperations = document?.definitions.filter(d => d.kind === Kind.OPERATION_DEFINITION)
  const selectionSet = (documentOperations?.length === 1 ? documentOperations[0] : documentOperations?.find(d => {
    return d.name?.value === input.request.operationName
  }))?.selectionSet ?? null

  decode_({
    data: input.data,
    sddmOutputObject,
    documentPart: selectionSet,
  })
}

const isCodecString = (value: unknown): value is CodecString => {
  return typeof value === `object` && value !== null && `encode` in value && typeof value.encode === `function`
}

const decode_ = (input: {
  data: Grafaid.SomeData | null | undefined
  sddmOutputObject: SchemaDrivenDataMap.OutputObject
  documentPart: null | Grafaid.Nodes.SelectionSetNode
}): void => {
  const { data, sddmOutputObject, documentPart } = input
  if (!data) return

  for (const [k, v] of Object.entries(data)) {
    // todo: test case of a custom scalar whose encoded value would be falsy in JS, like 0 or empty string
    if (v === null) continue

    const documentField = findDocumentField(documentPart, k)

    const kSchema = documentField?.name.value ?? k

    const sddmOutputField = sddmOutputObject[kSchema]
    if (!sddmOutputField) continue

    const node = sddmOutputField.nt

    if (isCodecString(node)) {
      data[k] = decodeValue(v, node)
    } else if (node) {
      decode_({
        data: v,
        sddmOutputObject: node,
        documentPart: documentField?.selectionSet ?? null,
      })
    } else {
      throw new Error(`Unknown index item: ${String(sddmOutputField)}`)
    }
  }
}

const decodeValue = (value: any, codec: CodecString): any => {
  if (Array.isArray(value)) {
    return value.map(item => decodeValue(item, codec))
  }
  return codec.decode(value)
}

const findDocumentField = (
  selectionSet: null | Grafaid.Nodes.SelectionSetNode,
  k: string,
): Grafaid.Nodes.FieldNode | null => {
  if (!selectionSet) return null

  for (const selection of selectionSet.selections) {
    if (selection.kind === Kind.FIELD && (selection.alias?.value ?? selection.name.value) === k) {
      return selection
    }
    if (selection.kind === Kind.INLINE_FRAGMENT) {
      const result = findDocumentField(selection.selectionSet, k)
      if (result !== null) return result
    }
  }

  return null
}
