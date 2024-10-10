import { type GraphQLEnumValue, type GraphQLField, type GraphQLNamedType, isEnumType } from 'graphql'
import { Code } from '../../../lib/Code.js'
import {
  type Describable,
  getNodeDisplayName,
  getTypeNameAndKind,
  isDeprecatableNode,
  type TypeMapKind,
} from '../../../lib/grafaid/graphql.js'
import { borderThickFullWidth, borderThinFullWidth, centerTo } from '../../../lib/text.js'
import type { Config } from '../config.js'

export const title1 = (title: string, subTitle?: string) => {
  const titleDecorated = `
    //
    //
    //
    //
    //
    //
    // ${borderThickFullWidth}
    // ${centerTo(borderThickFullWidth, title)}${subTitle ? `\n// ${centerTo(borderThickFullWidth, subTitle)}` : ``}
    // ${borderThickFullWidth}
    //
    //
    //
    //
    //
    //
  `
  return titleDecorated
}

export const typeTitle2 = (category: string) => (node: GraphQLNamedType) => {
  const nameKind = getTypeNameAndKind(node)
  const nameOrKind = nameKind.kind === `Scalar` ? nameKind.name : nameKind.kind
  const typeLabel = nameOrKind
  const title = `
    //
    //
    //
    //
    // ${category.toUpperCase()}
    // ${typeLabel.toUpperCase()}
    // ${borderThinFullWidth}
    // ${centerTo(borderThinFullWidth, node.name)}
    // ${borderThinFullWidth}
    //
    //
  `.trim()

  return title
}

export const typeTitle2SelectionSet = typeTitle2(`GRAPHQL SELECTION SET`)

export const typeTitle = (config: Config, typeName: TypeMapKind) => {
  const hasItems = config.schema.typeMapByKind[`GraphQL${typeName}Type`].length > 0
  const title = `${typeName} Types`
  const titleDecorated = `// ${title}\n// ${`-`.repeat(title.length)}\n`
  if (hasItems) {
    return titleDecorated
  } else {
    return `${titleDecorated}\n// -- None --\n`
  }
}

const defaultDescription = (node: Describable) => `There is no documentation for this ${getNodeDisplayName(node)}.`

export const renderDocumentation = (config: Config, node: Describable) => {
  return Code.TSDoc(getDocumentation(config, node))
}
export const getDocumentation = (config: Config, node: Describable) => {
  const generalDescription = node.description
    ?? (config.options.TSDoc.noDocPolicy === `message` ? defaultDescription(node) : null)

  const deprecationDescription = isDeprecatableNode(node) && node.deprecationReason
    ? `@deprecated ${node.deprecationReason}`
    : null

  const enumMemberDescriptions: string[] = isEnumType(node)
    ? node
      .getValues()
      .map((_) => {
        const deprecationDescription = _.deprecationReason
          ? `(DEPRECATED: ${_.deprecationReason})`
          : null
        const generalDescription = _.description
          ? _.description
          : config.options.TSDoc.noDocPolicy === `message`
          ? `Missing description.`
          : null
        if (!generalDescription && !deprecationDescription) return null
        const content = [generalDescription, deprecationDescription]
          .filter((_) => _ !== null)
          .join(` `)
        return [_, content] as const
      })
      .filter((_): _ is [GraphQLEnumValue, string] => _ !== null)
      .map(([node, description]) => {
        const content = `"${node.name}" - ${description}`
        return content
      })
    : []
  const enumMemberDescription = enumMemberDescriptions.length > 0
    ? `Members\n${enumMemberDescriptions.join(`\n`)}`
    : null
  if (!enumMemberDescription && !generalDescription && !deprecationDescription) {
    return null
  }
  const content = [
    generalDescription,
    enumMemberDescription,
    deprecationDescription,
  ]
    .filter((_) => _ !== null)
    .join(`\n\n`)
  return content
}

/**
 * Render the type name. Generally just a passthrough but
 * this guards against GraphQL type or property names that
 * would be illegal in TypeScript such as `namespace` or `interface`.
 */
export const renderName = (type: GraphQLNamedType | GraphQLField<any, any>) => {
  if (Code.reservedTypeScriptInterfaceNames.includes(type.name as any)) {
    return `$${type.name}`
  }
  return type.name
}
