import type { ResultSet } from '../../../../../src/entrypoints/schema.js'
import type * as Utils from '../../../../../src/entrypoints/utilities-for-generated.js'
import type { Index } from './SchemaIndex.js'
import type * as SelectionSet from './SelectionSets.js'

type Aug<
  $Config extends Utils.Config,
  $RootTypeName extends Index['RootTypesPresent'][number],
  $Selection,
> = Utils.ConfigGetOutputError<$Config, 'schema'> extends 'throw'
  ? (keyof $Selection & Index['error']['rootResultFields'][$RootTypeName]) extends never ? $Selection
  : $Selection & Utils.SelectionSet.TypenameSelection
  : $Selection

export interface QueryMethods<$Config extends Utils.Config> {
  $batch: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query>) => Promise<
    Utils.ResolveOutputReturnRootType<
      $Config,
      Index,
      ResultSet.Query<
        Aug<$Config, 'Query', $SelectionSet>,
        Index
      >
    >
  >
  __typename: () => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      '__typename',
      'Query'
    >
  >
  continent: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.continent>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'continent',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['continent'], Index>
    >
  >
  continents: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.continents>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'continents',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['continents'], Index>
    >
  >
  countries: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.countries>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'countries',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['countries'], Index>
    >
  >
  country: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.country>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'country',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['country'], Index>
    >
  >
  language: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.language>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'language',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['language'], Index>
    >
  >
  languages: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.languages>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'languages',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['languages'], Index>
    >
  >
}

export interface BuilderRootMethods<$Config extends Utils.Config> {
  query: QueryMethods<$Config>
}

export interface BuilderMethodsRootFn extends Utils.HKT.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderRootMethods<this['params']['Config']>
}