import type { ExecutionResult } from 'graphql'
import type { GraphQLExecutionResultError } from '../../../lib/graphql.js'
import type { SetProperty, StringKeyof } from '../../../lib/prelude.js'
import type { Schema } from '../../1_Schema/__.js'
import type { GlobalRegistry } from '../../2_generator/globalRegistry.js'
import type { SelectionSet } from '../../3_SelectionSet/__.js'
import type { Transport } from '../../5_core/types.js'

export type OutputChannel = 'throw' | 'return'

export type OutputChannelConfig = 'throw' | 'return' | 'default'

export type ErrorCategory = 'execution' | 'other' | 'schema'

export type OutputConfig = {
  defaults: {
    errorChannel: OutputChannel
  }
  envelope: {
    enabled: boolean
    errors: {
      execution: boolean
      other: boolean
      schema: boolean
    }
  }
  errors: {
    execution: OutputChannelConfig
    other: OutputChannelConfig
    schema: false | OutputChannelConfig
  }
}

export type OutputConfigDefault = {
  defaults: {
    errorChannel: 'throw'
  }
  envelope: {
    enabled: false
    errors: {
      execution: true
      other: false
      schema: false
    }
  }
  errors: {
    execution: 'default'
    other: 'default'
    schema: false
  }
}

export type ReturnModeType =
  | ReturnModeTypeGraphQL
  | ReturnModeTypeGraphQLSuccess
  | ReturnModeTypeDataSuccess
  | ReturnModeTypeData
  | ReturnModeTypeDataAndErrors

export type ReturnModeTypeBase =
  | ReturnModeTypeGraphQLSuccess
  | ReturnModeTypeGraphQL
  | ReturnModeTypeDataAndErrors
  | ReturnModeTypeData

export type ReturnModeTypeGraphQLSuccess = 'graphqlSuccess'

export type ReturnModeTypeGraphQL = 'graphql'

export type ReturnModeTypeData = 'data'

export type ReturnModeTypeDataAndErrors = 'dataAndErrors'

export type ReturnModeTypeDataSuccess = 'dataSuccess'

export type OptionsInput = {
  returnMode: ReturnModeType | undefined
}

export type OptionsInputDefaults = {
  returnMode: 'data'
}

export type Config = {
  output: OutputConfig
}

export type ApplyInputDefaults<$Input extends OptionsInput> = {
  [Key in keyof OptionsInputDefaults]: undefined extends $Input[Key] ? OptionsInputDefaults[Key]
    : Exclude<$Input[Key], undefined>
}

type ConfigGetOutputErrorChannel<$Config extends Config, $Channel extends OutputChannelConfig | false> =
  $Channel extends 'default' ? $Config['output']['defaults']['errorChannel']
    : $Channel extends false ? never
    : $Channel

type ConfigGetOutputEnvelopeErrorChannel<$Config extends Config, $ErrorCategory extends ErrorCategory> =
  $Config['output']['envelope']['errors'][$ErrorCategory] extends true ? never
    : ConfigGetOutputErrorChannel<$Config, $Config['output']['errors'][$ErrorCategory]>

// dprint-ignore
type ConfigGetOutputErrorReturns<$Config extends Config> = $Config['output']['envelope']['enabled'] extends true ? (
    | (ConfigGetOutputEnvelopeErrorChannel<$Config, 'execution'>  extends 'throw' ? never : GraphQLExecutionResultError)
    | (ConfigGetOutputEnvelopeErrorChannel<$Config, 'other'>      extends 'throw' ? never : Error)
  )
  : (
    | (ConfigGetOutputErrorChannel<$Config, $Config['output']['errors']['execution']> extends 'throw' ? never : GraphQLExecutionResultError)
    | (ConfigGetOutputErrorChannel<$Config, $Config['output']['errors']['other']>     extends 'throw' ? never : Error)
  )

// dprint-ignore
export type OutputRootType<$Config extends Config, $Index extends Schema.Index, $Data extends object> =
  $Config['output']['envelope']['enabled'] extends true     ? ExecutionResult<$Data | ConfigGetOutputErrorReturns<$Config>> : $Data | ConfigGetOutputErrorReturns<$Config>
// $Config['returnMode'] extends 'data'        ? $Data :
// $Config['returnMode'] extends 'dataSuccess' ? { [$Key in keyof $Data]: ExcludeSchemaErrors<$Index, $Data[$Key]> }  :
//                                               $Data | GraphQLExecutionResultError

// dprint-ignore
export type OutputRootField<$Config extends Config, $Index extends Schema.Index, $Data, $DataRaw = undefined> =
  $Config['output']['envelope']['enabled'] extends true
    ? ExecutionResult<($DataRaw extends undefined ? $Data : $DataRaw)> | ConfigGetOutputErrorReturns<$Config>
    :                 ($Data) | ConfigGetOutputErrorReturns<$Config>

// $Config['returnMode'] extends 'graphql'     ? ExecutionResult<$DataRaw extends undefined ? $Data : $DataRaw> :
// $Config['returnMode'] extends 'data'        ? $Data :
// $Config['returnMode'] extends 'dataSuccess' ? ExcludeSchemaErrors<$Index, $Data> :
//                                               $Data | GraphQLExecutionResultError

export type ExcludeSchemaErrors<$Index extends Schema.Index, $Data> = Exclude<
  $Data,
  $Index['error']['objectsTypename'][keyof $Index['error']['objectsTypename']]
>

export type OrThrowifyConfig<$Config extends Config> = $Config['returnMode'] extends 'graphql' ? $Config
  : SetProperty<$Config, 'returnMode', 'dataSuccess'>

/**
 * We inject __typename select when:
 * 1. using schema errors
 * 2. using return mode dataSuccess
 */

type TypenameSelection = { __typename: true }

// dprint-ignore
export type CreateSelectionTypename<$Config extends Config, $Index extends Schema.Index> =
  IsNeedSelectionTypename<$Config, $Index> extends true ? TypenameSelection : {} // eslint-disable-line

// dprint-ignore
export type IsNeedSelectionTypename<$Config extends Config, $Index extends Schema.Index> =
  $Config['returnMode'] extends 'dataSuccess' ?   GlobalRegistry.HasSchemaErrorsViaName<$Index['name']> extends true ?   true :
                                                                                                                  false :
                                                  false

export type AugmentRootTypeSelectionWithTypename<
  $Config extends Config,
  $Index extends Schema.Index,
  $RootTypeName extends Schema.RootTypeName,
  $Selection extends object,
> = IsNeedSelectionTypename<$Config, $Index> extends true ? {
    [$Key in StringKeyof<$Selection>]:
      & $Selection[$Key]
      & (IsRootFieldNameAResultField<$Index, $RootTypeName, $Key> extends true ? TypenameSelection : {}) // eslint-disable-line
  }
  : $Selection

type IsRootFieldNameAResultField<
  $Index extends Schema.Index,
  $RootTypeName extends Schema.RootTypeName,
  $FieldName extends string,
> = SelectionSet.AliasNameOrigin<$FieldName> extends keyof $Index['error']['rootResultFields'][$RootTypeName] ? true
  : false
