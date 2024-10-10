import { getNamedType, isUnionType } from 'graphql'
import { Code } from '../../../lib/Code.js'
import { Grafaid } from '../../../lib/grafaid/__.js'
import type { Schema } from '../../1_Schema/__.js'
import type { SchemaDrivenDataMap } from '../../7_customScalars/generator/SchemaDrivenDataMap.js'
import type { GlobalRegistry } from '../globalRegistry.js'
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { ModuleGeneratorData } from './Data.js'
import { ModuleGeneratorMethodsRoot } from './MethodsRoot.js'
import { ModuleGeneratorSchemaBuildtime } from './SchemaBuildtime.js'

/**
 * A generic schema index type. Any particular schema index will be a subtype of this, with
 * additional specificity such as on objects where here `Record` is used.
 */
// todo make all readonly?
export interface SchemaIndex {
  name: GlobalRegistry.SchemaNames
  RootTypesPresent: ('Query' | 'Mutation' | 'Subscription')[]
  RootUnion: Schema.Output.RootType
  Root: {
    Query: null | Schema.Output.ObjectQuery
    Mutation: null | Schema.Output.ObjectMutation
    Subscription: null | Schema.Output.ObjectSubscription
  }
  allTypes: Record<
    string,
    | Schema.Hybrid.Enum
    | Schema.Output.ObjectQuery
    | Schema.Output.ObjectMutation
    | Schema.Output.Object$2
    | Schema.Output.Union
    | Schema.Output.Interface
  >
  objects: Record<string, Schema.Output.Object$2>
  unions: Record<string, Schema.Output.Union>
  interfaces: Record<string, Schema.Output.Interface>
  customScalars: {
    input: SchemaDrivenDataMap
  }
  error: {
    objects: Record<string, Schema.Output.Object$2>
    objectsTypename: Record<string, { __typename: string }>
    rootResultFields: {
      Query: Record<string, string>
      Mutation: Record<string, string>
      Subscription: Record<string, string>
    }
  }
}

const identifiers = {
  Utilities: `Utilities`,
}

export const ModuleGeneratorSchemaIndex = createModuleGenerator(
  `SchemaIndex`,
  ({ config, code }) => {
    const SchemaBuildtimeNamespace = `Schema`
    const MethodsRootNamespace = `MethodsRoot`
    code(`/* eslint-disable */`)
    code(`
      import type * as Data from './${ModuleGeneratorData.name}.js'
      import type * as ${SchemaBuildtimeNamespace} from './${ModuleGeneratorSchemaBuildtime.name}.js'
      import type * as ${MethodsRootNamespace} from './${ModuleGeneratorMethodsRoot.name}.js'
      import type * as ${identifiers.Utilities} from '${config.paths.imports.grafflePackage.utilitiesForGenerated}'
    `)
    code()

    const rootTypesPresence = {
      Query: Grafaid.Schema.KindMap.hasQuery(config.schema.typeMapByKind),
      Mutation: Grafaid.Schema.KindMap.hasMutation(config.schema.typeMapByKind),
      Subscription: Grafaid.Schema.KindMap.hasSubscription(config.schema.typeMapByKind),
    }

    const root = config.schema.typeMapByKind.GraphQLRootType.map(_ =>
      [_.name, `${SchemaBuildtimeNamespace}.Root.${_.name}`] as const
    )

    const objects = config.schema.typeMapByKind.GraphQLObjectType.map(_ =>
      [_.name, `${SchemaBuildtimeNamespace}.Object.${_.name}`] as const
    )
    const unions = config.schema.typeMapByKind.GraphQLUnionType.map(_ =>
      [_.name, `${SchemaBuildtimeNamespace}.Union.${_.name}`] as const
    )
    const interfaces = config.schema.typeMapByKind.GraphQLInterfaceType.map(
      _ => [_.name, `${SchemaBuildtimeNamespace}.Interface.${_.name}`] as const,
    )
    const enums = config.schema.typeMapByKind.GraphQLEnumType.map(
      _ => [_.name, `${SchemaBuildtimeNamespace}.Enum.${_.name}`] as const,
    )

    code(Code.export$(
      Code.interface$(
        `Index`,
        Code.objectFrom({
          name: `Data.Name`,
          RootTypesPresent: `[${
            config.schema.typeMapByKind.GraphQLRootType.map((_) => Code.string(_.name)).join(`, `)
          }]`,
          RootUnion: config.schema.typeMapByKind.GraphQLRootType.map(_ => `${SchemaBuildtimeNamespace}.Root.${_.name}`)
            .join(`|`),
          Root: {
            type: Code.objectFrom({
              Query: rootTypesPresence.Query ? `${SchemaBuildtimeNamespace}.Root.Query` : null,
              Mutation: rootTypesPresence.Mutation ? `${SchemaBuildtimeNamespace}.Root.Mutation` : null,
              Subscription: rootTypesPresence.Subscription ? `${SchemaBuildtimeNamespace}.Root.Subscription` : null,
            }),
          },
          allTypes: Code.objectFromEntries([
            ...root,
            ...enums,
            ...objects,
            ...unions,
            ...interfaces,
          ]),
          objects: Code.objectFromEntries(objects),
          // schemaIndex: identifiers.customScalarsIndex,
          unions: Code.objectFromEntries(unions),
          interfaces: Code.objectFromEntries(interfaces),
          customScalars: `${identifiers.Utilities}.SchemaIndexBase['customScalars']`,
          // todo jsdoc comment saying:
          // Objects that match this pattern name: /.../
          error: Code.objectFrom({
            objects: Code.objectFromEntries(
              config.schema.error.objects.map(_ => [_.name, `${SchemaBuildtimeNamespace}.Object.${_.name}`]),
            ),
            objectsTypename: Code.objectFromEntries(
              config.schema.error.objects.map(_ => [_.name, `{ __typename: "${_.name}" }`]),
            ),
            rootResultFields: `{
              ${!Grafaid.Schema.KindMap.hasQuery(config.schema.typeMapByKind) ? `Query: {}` : ``}
              ${!Grafaid.Schema.KindMap.hasMutation(config.schema.typeMapByKind) ? `Mutation: {}` : ``}
              ${!Grafaid.Schema.KindMap.hasSubscription(config.schema.typeMapByKind) ? `Subscription: {}` : ``}
              ${
              Object.values(config.schema.typeMapByKind.GraphQLRootType).map((rootType) => {
                const resultFields = Object.values(rootType.getFields()).filter((field) => {
                  const type = getNamedType(field.type)
                  return isUnionType(type)
                    && type.getTypes().some(_ => config.schema.error.objects.some(__ => __.name === _.name))
                }).map((field) => field.name)

                return `${rootType.name}: {\n${resultFields.map(_ => `${_}: "${_}"`).join(`,\n`)} }`
              }).join(`\n`)
            }
          }`,
          }),
        }),
      ),
    ))

    return code
  },
)
