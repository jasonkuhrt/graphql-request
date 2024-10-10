import type { SelectionSet } from './_.js'
import { Arguments, Directive, Indicator, InlineFragment, SelectAlias, SelectScalarsWildcard } from './_.js'

export interface ParsedSelectionArguments {
  type: 'Arguments'
  arguments: Record<string, any>
}

export interface ParsedSelectionDirective {
  type: 'Directive'
  name: string
  /**
   * `null` when undefined is passed to a directive.
   */

  arguments: null | {
    input: unknown
    parsed: Record<string, any>
  }
}

export interface ParsedSelectionInlineFragments {
  type: 'InlineFragment'
  typeCondition: string | null
  selectionSets: SelectionSet.AnySelectionSet[]
}

export interface ParsedSelectionScalarsWildcard {
  type: 'ScalarsWildcard'
}

export interface ParsedSelectionSelectionSet {
  type: 'SelectionSet'
  name: string
  selectionSet: SelectionSet.AnySelectionSet
}

export interface ParsedSelectionIndicator {
  type: 'Indicator'
  name: string
  select: boolean
}

export interface ParsedSelectionAlias {
  type: 'Alias'
  name: string
  aliases: SelectAlias.SelectAliasMultiple
}

export type ParsedFieldSelection =
  | ParsedSelectionSelectionSet
  | ParsedSelectionIndicator

export type ParsedSelection =
  | ParsedSelectionArguments
  | ParsedSelectionDirective
  | ParsedSelectionInlineFragments
  | ParsedSelectionScalarsWildcard
  | ParsedSelectionSelectionSet
  | ParsedSelectionIndicator
  | ParsedSelectionAlias

export type ParsedFieldLevelSelection =
  | ParsedSelectionArguments
  | ParsedSelectionDirective

export type ParsedInlineFragmentLevelSelection =
  | ParsedSelectionDirective
  | ParsedSelectionObjectLevel

export type ParsedSelectionObjectLevel =
  | ParsedSelectionInlineFragments
  | ParsedSelectionScalarsWildcard
  | ParsedSelectionSelectionSet
  | ParsedSelectionIndicator
  | ParsedSelectionAlias

export const parseSelectionField = (key: string, value: any): ParsedFieldSelection => {
  return parseSelection(key, value) as any
}
export const parseSelectionRoot = (key: string, value: any): ParsedSelectionObjectLevel => {
  return parseSelection(key, value) as any
}

export const parseSelectionInlineFragment = (key: string, value: any): ParsedInlineFragmentLevelSelection => {
  return parseSelection(key, value) as any
}

export const parseSelection = (key: string, value: any): ParsedSelection => {
  if (key === Arguments.key) {
    return {
      type: `Arguments`,
      arguments: value,
    }
  }

  const directiveName = Directive.parseKey(key)
  if (directiveName) {
    // @ts-expect-error fixme
    const directiveDef = Directive.definitionsByName[directiveName]
    if (!directiveDef) {
      throw new Error(`Unknown directive ${key}.`)
    }

    return {
      type: `Directive`,
      name: directiveName,
      arguments: value === undefined ? null : {
        input: value,
        parsed: directiveDef.normalizeArguments(value),
      },
    }
  }

  if (key === SelectScalarsWildcard.key) {
    return {
      type: `ScalarsWildcard`,
    }
  }

  if (Indicator.isIndicator(value)) {
    return {
      type: `Indicator`,
      name: key,
      select: Indicator.isPositiveIndicator(value),
    }
  }

  const inlineFragment = InlineFragment.parseKey(key)
  if (inlineFragment) {
    const selectionSets = InlineFragment.normalizeInlineFragment(value)
    return {
      type: `InlineFragment`,
      typeCondition: inlineFragment.typeCondition,
      selectionSets,
    }
  }

  // Parse alias after inline fragment because both can have array values but the keys are distinctive
  if (SelectAlias.isSelectAlias(value)) {
    return {
      type: `Alias`,
      name: key,
      aliases: SelectAlias.normalizeSelectAlias(value),
    }
  }

  if (typeof value === `object` && value !== null) {
    return {
      type: `SelectionSet`,
      name: key,
      selectionSet: value,
    }
  }

  throw new Error(`Unknown selection at key ${key}.`)
}
