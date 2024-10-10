import type { Grafaid } from '../../../lib/grafaid/__.js'
import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import { casesExhausted, isNonNull } from '../../../lib/prelude.js'
import type { ParsedSelectionObjectLevel } from '../../2_Select/_.js'
import type { SchemaDrivenDataMap } from '../../7_customScalars/generator/SchemaDrivenDataMap.js'
import type { GraphQLPostOperationMapper } from '../types.js'
import { toGraphQLField } from './Field.js'
import { toGraphQLInlineFragments } from './InlineFragments.js'

export const fromGraffleSelectionObjectLevel: GraphQLPostOperationMapper<
  SchemaDrivenDataMap.OutputObject,
  Grafaid.Nodes.SelectionNode[],
  [
    keyParsed: ParsedSelectionObjectLevel,
  ]
> = (
  context,
  sddm,
  selection,
) => {
  switch (selection.type) {
    case `Indicator`: {
      if (!selection.select) return []

      return [Nodes.Field({
        name: Nodes.Name({ value: selection.name }),
      })]
    }
    case `InlineFragment`: {
      return toGraphQLInlineFragments(context, sddm, selection)
    }
    case `Alias`: {
      const sddmOutputField = sddm?.f[selection.name]
      return selection.aliases.map(alias => {
        return toGraphQLField(context, sddmOutputField, {
          name: selection.name,
          alias: alias[0],
          value: alias[1],
        })
      }).filter(isNonNull)
    }
    case `SelectionSet`: {
      const sddmOutputField = sddm?.f[selection.name]
      const outputField = {
        alias: null,
        name: selection.name,
        value: selection.selectionSet,
      }
      return [toGraphQLField(context, sddmOutputField, outputField)].filter(isNonNull)
    }
    // todo make this an extension that requires the schema.
    case `ScalarsWildcard`: {
      // todo get scalar fields from the schema
      throw new Error(`todo`)
    }
    // todo
    // case 'FragmentSpread'
    default: {
      throw casesExhausted(selection)
    }
  }
}
