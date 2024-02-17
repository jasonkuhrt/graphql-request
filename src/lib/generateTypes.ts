import type { AnyClass, NameToClassNamedType } from './graphql.js'
import { getTypeMapByKind, type NameToClass } from './graphql.js'
import { readFileSync } from 'fs'
import type {
  GraphQLField,
  GraphQLInputField,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLNamedType,
  GraphQLObjectType,
} from 'graphql'
import { GraphQLNonNull } from 'graphql'
import { buildSchema } from 'graphql'
import fs from 'node:fs'

type AnyGraphQLField = GraphQLField<any, any, any> | GraphQLInputField
// type AnyGraphQLFieldMap = GraphQLFieldMap<any, any>
// type AnyGraphQLNonNull = GraphQLNonNull<GraphQLNullableType>
// type AnyGraphQLList = GraphQLList<GraphQLOutputType>

type AnyGraphQLFieldsType = GraphQLObjectType | GraphQLInterfaceType | GraphQLInputObjectType

const definePointerRenderers = <$Renderers extends { [ClassName in keyof NameToClass]: any }>(renderers: {
  [ClassName in keyof $Renderers]: (
    node: ClassName extends keyof NameToClass ? InstanceType<NameToClass[ClassName]> : never,
  ) => string
}) => renderers

const defineConcreteRenderers = <
  $Renderers extends { [ClassName in keyof NameToClassNamedType]: any },
>(renderers: {
  [ClassName in keyof $Renderers]: (
    node: ClassName extends keyof NameToClassNamedType
      ? InstanceType<NameToClassNamedType[ClassName]>
      : never,
  ) => string
}): {
  [ClassName in keyof $Renderers]: (
    node: ClassName extends keyof NameToClass
      ? InstanceType<NameToClass[ClassName]> | null | undefined
      : never,
  ) => string
} => {
  return Object.fromEntries(
    Object.entries(renderers).map(([key, renderer]) => {
      return [
        key,
        (node: any) => {
          if (!node) return ``
          return renderer(node) //eslint-disable-line
        },
      ]
    }),
  ) as any
}

const dispatchToPointerRenderer = (node: AnyClass): string => {
  // @ts-expect-error lookup
  const renderer = pointerRenderers[node.constructor.name] //eslint-disable-line
  if (!renderer) throw new Error(`No renderer found for class: ${node.constructor.name}`)
  return renderer(node) //eslint-disable-line
}

const dispatchToConcreteRenderer = (node: GraphQLNamedType): string => {
  // @ts-expect-error lookup
  const renderer = concreteRenderers[node.constructor.name] //eslint-disable-line
  if (!renderer) throw new Error(`No renderer found for class: ${node.constructor.name}`)
  return renderer(node) //eslint-disable-line
}

const pointerRenderers = definePointerRenderers({
  GraphQLNonNull: (node) => dispatchToPointerRenderer(node.ofType),
  GraphQLEnumType: (node) => node.name,
  GraphQLInputObjectType: (node) => node.name,
  GraphQLInterfaceType: (node) => node.name,
  GraphQLList: (node) => Code.list(dispatchToPointerRenderer(node.ofType)),
  GraphQLObjectType: (node) => node.name,
  GraphQLScalarType: (node) => `$.Scalars[${Code.quote(node.name)}]`,
  GraphQLUnionType: (node) => Code.unionItems(node.getTypes().map((_) => dispatchToPointerRenderer(_))),
})

const concreteRenderers = defineConcreteRenderers({
  GraphQLEnumType: (node) =>
    Code.union(
      node.name,
      node.getValues().map((_) => Code.quote(_.name)),
    ),
  GraphQLInputObjectType: (node) => Code.inter(node.name, renderFields(node)),
  GraphQLInterfaceType: (node) => Code.inter(node.name, renderFields(node)),
  GraphQLObjectType: (node) => Code.inter(node.name, renderFields(node)),
  GraphQLScalarType: () => ``,
  GraphQLUnionType: (node) =>
    Code.union(
      node.name,
      node.getTypes().map((_) => dispatchToPointerRenderer(_)),
    ),
})

const renderFields = (node: AnyGraphQLFieldsType): string => {
  return Code.fieldTypes(
    Object.values(node.getFields()).map((field) => Code.fieldType(field.name, renderField(field))),
  )
}

const renderField = (field: AnyGraphQLField): string => {
  const [fieldType, nullable] =
    field.type instanceof GraphQLNonNull ? [field.type.ofType, false] : [field.type, true]
  return nullable ? Code.nullable(dispatchToPointerRenderer(fieldType)) : dispatchToPointerRenderer(fieldType) //eslint-disable-line
}

namespace Code {
  export const quote = (str: string) => `"${str}"`
  export const nullable = (type: string) => `${type} | null`
  export const union = (name: string, types: string[]) => `type ${name} =\n| ${Code.unionItems(types)}`
  export const unionItems = (types: string[]) => types.join(`\n| `)
  export const list = (type: string) => `Array<${type}>`
  export const fieldType = (name: string, type: string) => `"${name}": ${type}`
  export const fieldTypes = (fieldTypes: string[]) => fieldTypes.join(`\n`)
  export const inter = (name: string, fields: string) => `interface ${name} {\n${fields}\n}`
  export const commentSectionTitle = (title: string) => {
    const lineSize = 60
    const line = `-`.repeat(lineSize)
    const titlePrefixSpace = ` `.repeat(Math.round(lineSize / 2) - Math.round(title.length / 2))
    const titleSuffixSpace = ` `.repeat(lineSize - (titlePrefixSpace.length + title.length))
    return `\n\n// ${line} //\n// ${titlePrefixSpace + title + titleSuffixSpace} //\n// ${line} //\n\n`
  }
}

const scalarTypeMap: Record<string, 'string' | 'number' | 'boolean'> = {
  ID: `string`,
  Int: `number`,
  String: `string`,
  Float: `number`,
  Boolean: `boolean`,
}

// high level

interface Input {
  schemaSource: string
}

const generateSchemaTypes = (input: Input) => {
  const schema = buildSchema(input.schemaSource)
  const typeMapByKind = getTypeMapByKind(schema)

  let code = ``

  code += `
    namespace $ {
      export interface Scalars {
        ${typeMapByKind.GraphQLScalarType.map((_) => {
          // todo strict mode where instead of falling back to "any" we throw an error
          const type = scalarTypeMap[_.name] || `any`
          return Code.fieldType(_.name, type)
        }).join(`\n`)}
      } 
    }
  `

  for (const [name, types] of Object.entries(typeMapByKind)) {
    if (name === `GraphQLScalarType`) continue

    code += Code.commentSectionTitle(name.replace(/^GraphQL/, ``).replace(/Type$/, ``))
    if (types.length === 0) {
      code += `// -- no types --\n`
      continue
    }
    code += types.map(dispatchToConcreteRenderer).join(`\n\n`)
  }

  return code
}

// demo

const schemaSource = readFileSync(`./examples/schema.graphql`, `utf8`)
const code = generateSchemaTypes({ schemaSource })
fs.writeFileSync(`./src/demo.ts`, code, { encoding: `utf8` })
