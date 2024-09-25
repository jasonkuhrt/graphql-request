import type { DocumentNode, ExecutionResult, GraphQLSchema } from 'graphql'
import type { GraphQLRequestEncoded, GraphQLRequestInput, StandardScalarVariables } from '../../lib/graphql.js'
import type { getRequestEncodeSearchParameters, postRequestEncodeBody } from '../../lib/graphqlHTTP.js'
import type { Schema } from '../1_Schema/__.js'
import type { GraphQLObjectSelection } from '../2_SelectionSet/print.js'
import type { Config } from '../6_client/Settings/Config.js'
import type { CoreExchangeGetRequest, CoreExchangePostRequest } from '../6_client/transportHttp/request.js'
import type {
  ContextInterfaceRaw,
  ContextInterfaceTyped,
  InterfaceRaw,
  InterfaceTyped,
  TransportHttp,
  TransportMemory,
} from './types.js'

type InterfaceInput<TypedProperties = {}, RawProperties = {}> =
  | ({
    interface: InterfaceTyped
    context: ContextInterfaceTyped
    rootTypeName: Schema.RootTypeName
  } & TypedProperties)
  | ({
    interface: InterfaceRaw
    context: ContextInterfaceRaw
  } & RawProperties)

// dprint-ignore

type TransportInput<$Config extends Config, $HttpProperties = {}, $MemoryProperties = {}> =
  | (
      TransportHttp extends $Config['transport']['type']
        ? ({
            transport: TransportHttp
            
          } & $HttpProperties)
        : never
    )
  | (
      TransportMemory extends $Config['transport']['type']
        ? ({
          transport: TransportMemory
        } & $MemoryProperties)
        : never
    )

export const hookNamesOrderedBySequence = [`encode`, `pack`, `exchange`, `unpack`, `decode`, `output`] as const

export type HookSequence = typeof hookNamesOrderedBySequence

export type HookDefEncode<$Config extends Config> = {
  input:
    & InterfaceInput<{ selection: GraphQLObjectSelection }, GraphQLRequestInput>
    & TransportInput<$Config, { schema: string | URL }, { schema: GraphQLSchema }>
}

export type HookDefPack<$Config extends Config> = {
  input:
    & GraphQLRequestEncoded
    & InterfaceInput
    // todo why is headers here but not other http request properties?
    & TransportInput<$Config, { url: string | URL; headers?: HeadersInit }, {
      schema: GraphQLSchema
    }>
  slots: {
    /**
     * When request will be sent using GET this slot is called to create the value that will be used for the HTTP Search Parameters.
     */
    searchParams: getRequestEncodeSearchParameters
    /**
     * When request will be sent using POST this slot is called to create the value that will be used for the HTTP body.
     */
    body: postRequestEncodeBody
  }
}

export type HookDefExchange<$Config extends Config> = {
  slots: {
    fetch: (request: Request) => Response | Promise<Response>
  }
  input:
    & InterfaceInput
    & TransportInput<$Config, {
      request: CoreExchangePostRequest | CoreExchangeGetRequest
    }, {
      schema: GraphQLSchema
      query: string | DocumentNode
      variables?: StandardScalarVariables
      operationName?: string
    }>
}

export type HookDefUnpack<$Config extends Config> = {
  input:
    & InterfaceInput
    & TransportInput<$Config, { response: Response }, {
      result: ExecutionResult
    }>
}

export type HookDefDecode<$Config extends Config> = {
  input:
    & { result: ExecutionResult }
    & InterfaceInput
    & TransportInput<$Config, { response: Response }>
}

export type HookDefOutput<$Config extends Config> = {
  input:
    & { result: ExecutionResult }
    & InterfaceInput
    & TransportInput<$Config, { response: Response }>
}

export type Result = ResultThrow | ResultReturn
export type ResultThrow = {
  type: 'throw'
  value: Error
}
export const resultThrow = (error: Error): ResultThrow => ({
  type: `throw`,
  value: error,
})
export type ResultReturn = {
  type: 'return'
  value: unknown // could be _many_ things depending on the return mode and request method used etc.
}
export const resultReturn = (value: unknown): ResultReturn => ({
  type: `return`,
  value,
})

export type HookMap<$Config extends Config = Config> = {
  encode: HookDefEncode<$Config>
  pack: HookDefPack<$Config>
  exchange: HookDefExchange<$Config>
  unpack: HookDefUnpack<$Config>
  decode: HookDefDecode<$Config>
  output: HookDefOutput<$Config>
}
