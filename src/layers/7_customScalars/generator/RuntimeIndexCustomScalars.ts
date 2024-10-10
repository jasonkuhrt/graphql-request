// todo we are going to run into recursion with input types such as two input
// objects each having their own custom scalars and also referencing one another.
// to solve this we'll need to either use thunks or some kind of indirect look up table?
import { Code } from '../../../lib/Code.js'
import { Grafaid } from '../../../lib/grafaid/__.js'
import { entries } from '../../../lib/prelude.js'
import type { Config } from '../../4_generator/config.js'
import { ModuleGeneratorScalar } from '../../4_generator/generators/Scalar.js'
import { createModuleGenerator } from '../../4_generator/helpers/moduleGenerator.js'
import { createCodeGenerator } from '../../4_generator/helpers/moduleGeneratorRunner.js'
import { title1 } from '../../4_generator/helpers/render.js'

const identifiers = {
  $CustomScalars: `CustomScalars`,
}

type ReferenceAssignments = string[]

export const ModuleGeneratorRuntimeSchemaDrivenData = createModuleGenerator(
  `RuntimeCustomScalars`,
  ({ config, code }) => {
    code(`
      import * as ${identifiers.$CustomScalars} from './${ModuleGeneratorScalar.name}.js'
      import type * as $Utilities from '${config.paths.imports.grafflePackage.utilitiesForGenerated}'
    `)

    const kinds = getKinds(config)

    const referenceAssignments: ReferenceAssignments = []

    for (const [kindName, nodes] of entries(kinds)) {
      code(title1(kindName))
      code()
      if (nodes.length === 0) {
        code(`// None of your ${kindName}s have custom scalars.`)
      }
      for (const type of nodes) {
        const codeGenerator = kindRenders[kindName] as any
        code(codeGenerator({ config, type: type as any, referenceAssignments }))
        code()
      }
      code()
    }

    code(title1(`Reference Assignments`, `(avoids circular assignment issues)`))
    code()
    if (referenceAssignments.length === 0) {
      code(`// None of your types have references to other non-scalar/enum types.`)
    }
    for (const referenceAssignment of referenceAssignments) {
      code(referenceAssignment)
    }
    code()

    code(title1(`Index`))
    code()
    code(`export const $index = {`)
    kinds.GraphQLRootType.forEach(type => {
      code(type.name + `,`)
    })
    code(`}`)
  },
)

//
//
//
// Helpers
// -------
//
//
//

/**
 * Get minimal kind set for SDDM
 *
 * If feature operationVariables is enabled then we need to emit all paths to inputs.
 * If feature customScalars is enabled then we need to emit all paths to customs scalar inputs AND outputs.
 * If both are enabled the merged requirement is: all paths to inputs AND custom scalar outputs.
 */
const getKinds = (config: Config) => {
  const { schema: { typeMapByKind } } = config
  const condition = typeCondition(config)
  return {
    GraphQLInputObjectType: typeMapByKind.GraphQLInputObjectType.filter(condition),
    GraphQLObjectType: typeMapByKind.GraphQLObjectType.filter(condition),
    GraphQLInterfaceType: typeMapByKind.GraphQLInterfaceType.filter(condition),
    GraphQLUnionType: typeMapByKind.GraphQLUnionType.filter(condition),
    GraphQLRootType: typeMapByKind.GraphQLRootType.filter(condition),
  }
}

const typeCondition = (config: Config) => {
  if (config.runtimeFeatures.customScalars) {
    if (config.runtimeFeatures.operationVariables) {
      const isHasInputOrOutputCustomScalar = () => true // todo
      return isHasInputOrOutputCustomScalar
    }
    return Grafaid.Nodes.$Schema.CustomScalars.isHasCustomScalars
  }

  if (config.runtimeFeatures.operationVariables) {
    const isHasInput = () => true // todo
    return isHasInput
  }

  return falseFilter
}

const falseFilter = () => false
const trueFilter = () => true

const inputTypeCondition = (config: Config) => {
  if (config.runtimeFeatures.operationVariables) return trueFilter

  if (config.runtimeFeatures.customScalars) {
    return Grafaid.Nodes.$Schema.CustomScalars.isHasCustomScalars
  }

  return falseFilter
}

//
//
//
// Code Generators
// ---------------
//
//
//

const UnionType = createCodeGenerator<
  { type: Grafaid.Nodes.$Schema.GraphQLUnionType; referenceAssignments: ReferenceAssignments }
>(
  ({ code, type }) => {
    // This takes advantage of the fact that in GraphQL, in a union type, all members that happen
    // to have fields of the same name, those fields MUST be the same type.
    // See:
    // - https://github.com/graphql/graphql-js/issues/1361
    // - https://stackoverflow.com/questions/44170603/graphql-using-same-field-names-in-different-types-within-union
    //
    // So what we do is inline all the custom scalar paths of all union members knowing
    // that they could never conflict.
    code(`const ${type.name} = { f: {`)
    for (const memberType of type.getTypes()) {
      if (Grafaid.Nodes.$Schema.CustomScalars.isHasCustomScalars(memberType)) {
        code(`...${memberType.name},`)
      }
    }
    code(`}, }`)
  },
)

const InterfaceType = createCodeGenerator<
  { type: Grafaid.Nodes.$Schema.GraphQLInterfaceType; referenceAssignments: ReferenceAssignments }
>(
  ({ code, type, config }) => {
    const implementorTypes = Grafaid.Nodes.$Schema.KindMap.getInterfaceImplementors(config.schema.typeMapByKind, type)
    code(`const ${type.name} = { f: {`)
    for (const implementorType of implementorTypes) {
      if (Grafaid.Nodes.$Schema.CustomScalars.isHasCustomScalars(implementorType)) {
        code(`...${implementorType.name},`)
      }
    }
    code(`}, }`)
  },
)

const ObjectType = createCodeGenerator<
  { type: Grafaid.Nodes.$Schema.GraphQLObjectType; referenceAssignments: ReferenceAssignments }
>(
  ({ config, code, type, referenceAssignments }) => {
    code(`const ${type.name}: $Utilities.SchemaDrivenDataMap.OutputObject = {`)
    code(`f: {`)

    const condition = typeCondition(config)

    const outputFields = Object.values(type.getFields()).filter(condition)
    for (const outputField of outputFields) {
      code(Code.termField(outputField.name, `{`, { comma: false }))

      // Field Arguments
      const inputCondition = inputTypeCondition(config)
      const args = outputField.args.filter(inputCondition)
      if (args.length > 0) {
        code(`a: {`)
        for (const arg of args) {
          const argType = Grafaid.Nodes.getNamedType(arg.type)
          const isNeeded = (config.runtimeFeatures.operationVariables && Grafaid.Nodes.$Schema.isScalarType(argType))
            || (config.runtimeFeatures.customScalars && Grafaid.Nodes.$Schema.isScalarTypeAndCustom(argType))
          if (isNeeded) {
            const nt = (Grafaid.Nodes.$Schema.isInputObjectType(argType) && config.runtimeFeatures.operationVariables)
              ? Code.termField(`nt`, argType.name)
              : (Grafaid.Nodes.$Schema.isScalarTypeAndCustom(argType) && config.runtimeFeatures.customScalars)
                  || (Grafaid.Nodes.$Schema.isScalarType(argType) && config.runtimeFeatures.operationVariables)
              ? Code.termField(`nt`, `${identifiers.$CustomScalars}.${argType.name}`)
              : ``
            const it = config.runtimeFeatures.operationVariables
              ? Code.termField(`it`, inlineType(arg.type))
              : ``
            code(Code.termField(
              arg.name,
              `{
                ${it}
                ${nt}
              }`,
            ))
          }
        }
        code(`},`)
      }

      const outputFieldType = Grafaid.Nodes.getNamedType(outputField.type)

      if (condition(outputFieldType)) {
        if (Grafaid.Nodes.$Schema.isScalarTypeAndCustom(outputFieldType)) {
          if (config.runtimeFeatures.customScalars) {
            code(Code.termField(`nt`, `${identifiers.$CustomScalars}.${outputFieldType.name}`))
          }
        } else if (
          Grafaid.Nodes.$Schema.isUnionType(outputFieldType) || Grafaid.Nodes.$Schema.isObjectType(outputFieldType)
          || Grafaid.Nodes.$Schema.isInterfaceType(outputFieldType)
        ) {
          referenceAssignments.push(`${type.name}.f['${outputField.name}']!.nt = ${outputFieldType.name}`)
          const hint = `// ${
            Code.termField(`nt`, outputFieldType.name)
          } <-- Assigned later to avoid potential circular dependency.`
          code(hint)
          // // todo make kitchen sink schema have a pattern where this code path will be traversed.
          // // We just need to have arguments on a field on a nested object.
          // // Nested objects that in turn have custom scalar arguments
          // if (Nodes.$Schema.isObjectType(fieldType) && Nodes.$Schema.isHasCustomScalars(fieldType)) {
          //   code(Code.termField(field.name, fieldType.name))
          // }
        }
      }

      code(`},`)
    }
    code(`},`)
    code(`}`)
  },
)

const InputObjectType = createCodeGenerator<
  { type: Grafaid.Nodes.$Schema.GraphQLInputObjectType; referenceAssignments: ReferenceAssignments }
>(
  ({ config, code, type, referenceAssignments }) => {
    code(`const ${type.name}: $Utilities.SchemaDrivenDataMap.InputObject = {`)

    if (config.runtimeFeatures.operationVariables) {
      code(Code.termField(`n`, Code.string(type.name)))
    }
    code(`f: {`)

    for (const inputField of Object.values(type.getFields())) {
      const inputFieldType = Grafaid.Nodes.getNamedType(inputField.type)

      // dprint-ignore
      const isPresent =
        config.runtimeFeatures.operationVariables ||
        (config.runtimeFeatures.customScalars &&
          (Grafaid.Nodes.$Schema.isScalarTypeAndCustom(inputFieldType) ||
          (Grafaid.Nodes.$Schema.isInputObjectType(inputFieldType) && Grafaid.Nodes.$Schema.CustomScalars.isHasCustomScalarInputs(inputFieldType))))

      if (!isPresent) continue

      code(`${inputField.name}: {`)

      let nt = ``
      if (Grafaid.Nodes.$Schema.isScalarTypeAndCustom(inputFieldType)) {
        nt = Code.termField(`nt`, `${identifiers.$CustomScalars}.${inputFieldType.name}`)
      } else if (
        Grafaid.Nodes.$Schema.isInputObjectType(inputFieldType)
        && Grafaid.Nodes.$Schema.CustomScalars.isHasCustomScalarInputs(inputFieldType)
      ) {
        referenceAssignments.push(`${type.name}.f!['${inputField.name}']!.nt = ${inputFieldType.name}`)
        nt = `// ${
          Code.termField(`nt`, inputFieldType.name)
        } <-- Assigned later to avoid potential circular dependency.`
      }

      code(nt)
      code(`},`)
    }
    code(`}`)
    code(`}`)
  },
)

const kindRenders = {
  GraphQLUnionType: UnionType,
  GraphQLInterfaceType: InterfaceType,
  GraphQLInputObjectType: InputObjectType,
  GraphQLObjectType: ObjectType,
  GraphQLRootType: ObjectType,
}

const inlineType = (type: Grafaid.Schema.GraphQLInputType): string => {
  const [ofType, nonNull] = Grafaid.Schema.isNonNullType(type)
    ? [type.ofType, true]
    : [type, false]

  const nullFlag = nonNull ? `1` : `0`

  const rest = Grafaid.Schema.isListType(ofType)
    ? inlineType(ofType.ofType)
    : ``

  return `[${nullFlag}, ${rest}]`
}
