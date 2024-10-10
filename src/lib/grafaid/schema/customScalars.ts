import {
  getNamedType,
  type GraphQLArgument,
  type GraphQLField,
  type GraphQLInputField,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isObjectType,
  isScalarType,
  isUnionType,
} from 'graphql'
import type { GraphQLInputObjectType, GraphQLNamedOutputType } from 'graphql'
import { casesExhausted } from '../../prelude.js'
import { isGraphQLArgumentOrInputField, isGraphQLField, isScalarTypeAndCustom } from './schema.js'

export const isHasCustomScalars = (
  node: GraphQLNamedOutputType | GraphQLField<any, any> | GraphQLInputObjectType | GraphQLInputField | GraphQLArgument,
): boolean => {
  if (isInputObjectType(node) || isGraphQLArgumentOrInputField(node)) {
    return isHasCustomScalarInputs(node)
  }

  return isHasCustomScalarOutputs(node) || isHasCustomScalarInputs(node)
}

export const isHasCustomScalarOutputs = (
  node:
    | GraphQLNamedOutputType
    | GraphQLField<any, any>,
): boolean => {
  return isHasCustomScalarOutputs_(node, [])
}

const isHasCustomScalarOutputs_ = (
  node: GraphQLNamedOutputType | GraphQLField<any, any>,
  typePath: string[],
): boolean => {
  if (isGraphQLField(node)) {
    const fieldType = getNamedType(node.type)
    return isHasCustomScalarOutputs_(fieldType, typePath)
  }

  if (isEnumType(node)) {
    return false
  }

  if (isScalarType(node)) {
    return isScalarTypeAndCustom(node)
  }

  if (typePath.includes(node.name)) {
    // End Via Short-Circuit: We've already come from this type.
    return false
  } else {
    typePath = [...typePath, node.name]
  }

  if (isObjectType(node) || isInterfaceType(node)) {
    return Object.values(node.getFields()).some(field => isHasCustomScalarOutputs_(field, typePath))
  }

  if (isUnionType(node)) {
    return node.getTypes().some(type => isHasCustomScalarOutputs_(type, typePath))
  }

  throw casesExhausted(node)
}

export const isHasCustomScalarInputs = (
  node:
    | GraphQLNamedOutputType
    | GraphQLInputObjectType
    | GraphQLInputField
    | GraphQLArgument
    | GraphQLField<any, any>,
): boolean => {
  return isHasCustomScalarInputs_(node, [])
}

const isHasCustomScalarInputs_ = (
  node: GraphQLInputObjectType | GraphQLNamedOutputType | GraphQLArgument | GraphQLField<any, any>,
  typePath: string[],
): boolean => {
  if (isGraphQLArgumentOrInputField(node)) {
    return isHasCustomScalarInputs_(getNamedType(node.type), typePath)
  }

  if (isGraphQLField(node)) {
    const fieldType = getNamedType(node.type)
    return node.args.some(arg => isHasCustomScalarInputs_(arg, typePath))
      || (isObjectType(fieldType) && isHasCustomScalarInputs_(fieldType, typePath))
  }

  if (isEnumType(node)) {
    return false
  }

  if (isScalarType(node)) {
    return isScalarTypeAndCustom(node)
  }

  if (typePath.includes(node.name)) {
    // End Via Short-Circuit: We've already come from this type.
    return false
  } else {
    typePath = [...typePath, node.name]
  }

  if (isInputObjectType(node)) {
    return Object.values(node.getFields()).some(field => isHasCustomScalarInputs_(field, typePath))
  }

  if (isObjectType(node) || isInterfaceType(node)) {
    return Object.values(node.getFields()).some(field => isHasCustomScalarInputs_(field, typePath))
  }

  if (isUnionType(node)) {
    return false
  }

  throw casesExhausted(node)
}
