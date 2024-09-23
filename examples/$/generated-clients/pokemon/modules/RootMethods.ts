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
  pokemon: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.pokemon>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'pokemon',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['pokemon'], Index>
    >
  >
  pokemonByName: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.pokemonByName>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'pokemonByName',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['pokemonByName'], Index>
    >
  >
  trainerByName: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.trainerByName>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'trainerByName',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['trainerByName'], Index>
    >
  >
  trainers: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.trainers>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'trainers',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['trainers'], Index>
    >
  >
}

export interface MutationMethods<$Config extends Utils.Config> {
  $batch: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Mutation>) => Promise<
    Utils.ResolveOutputReturnRootType<
      $Config,
      Index,
      ResultSet.Mutation<
        Aug<$Config, 'Mutation', $SelectionSet>,
        Index
      >
    >
  >
  __typename: () => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      '__typename',
      'Mutation'
    >
  >
  addPokemon: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Mutation.addPokemon>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'addPokemon',
      ResultSet.Field<$SelectionSet, Index['Root']['Mutation']['fields']['addPokemon'], Index>
    >
  >
}

export interface BuilderRootMethods<$Config extends Utils.Config> {
  mutation: MutationMethods<$Config>
  query: QueryMethods<$Config>
}

export interface BuilderMethodsRootFn extends Utils.HKT.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderRootMethods<this['params']['Config']>
}