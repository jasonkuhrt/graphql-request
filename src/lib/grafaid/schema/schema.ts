import {
  type GraphQLArgument,
  GraphQLEnumType,
  type GraphQLField,
  type GraphQLInputField,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLUnionType,
  isNonNullType,
  isObjectType,
} from 'graphql'
import { GraphQLInputObjectType, isScalarType } from 'graphql'
import type { AnyGraphQLOutputField } from '../graphql.js'

export {
  getNullableType,
  GraphQLInputObjectType,
  type GraphQLInputType,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  type GraphQLType,
  GraphQLUnionType,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isListType,
  isNamedType,
  isNonNullType,
  isNullableType,
  isObjectType,
  isRequiredArgument,
  isRequiredInputField,
  isScalarType,
  isUnionType,
} from 'graphql'

export * as Args from './args.js'
export * as CustomScalars from './customScalars.js'
export * as KindMap from './kindMap.js'

export const isGraphQLOutputField = (object: object): object is AnyGraphQLOutputField => {
  return `args` in object
}

export const isGraphQLArgumentOrInputField = (value: object): value is GraphQLArgument | GraphQLInputField => {
  return `defaultValue` in value
}

export const isGraphQLField = (value: object): value is GraphQLField<any, any> => {
  return `args` in value
}

export const isScalarTypeCustom = (node: GraphQLScalarType): boolean => {
  return node.astNode !== undefined
}

export const isScalarTypeAndCustom = (node: unknown): node is GraphQLScalarType => {
  return isScalarType(node) && node.astNode !== undefined
}

export const isAllInputObjectFieldsNullable = (node: GraphQLInputObjectType) => {
  return Object.values(node.getFields()).some(_ => !isNonNullType(_.type))
}

export const NameToClassNamedType = {
  GraphQLScalarType: GraphQLScalarType,
  GraphQLObjectType: GraphQLObjectType,
  GraphQLInterfaceType: GraphQLInterfaceType,
  GraphQLUnionType: GraphQLUnionType,
  GraphQLEnumType: GraphQLEnumType,
  GraphQLInputObjectType: GraphQLInputObjectType,
}

export type NameToClassNamedType = typeof NameToClassNamedType

export const RootTypeName = {
  Query: `Query`,
  Mutation: `Mutation`,
  Subscription: `Subscription`,
} as const

export type RootTypeName = keyof typeof RootTypeName

export type RootTypeNameQuery = typeof RootTypeName['Query']

export type RootTypeNameMutation = typeof RootTypeName['Mutation']

export type RootTypeNameSubscription = typeof RootTypeName['Subscription']

export const isRootType = (value: unknown): value is GraphQLObjectType => {
  return isObjectType(value) && value.name in RootTypeName
}
