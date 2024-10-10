import type { Grafaid } from '../../../lib/grafaid/__.js'
import type { Select } from '../../2_Select/__.js'
import type { SchemaDrivenDataMap } from '../../7_customScalars/generator/SchemaDrivenDataMap.js'
import type { GraphQLPostOperationMapper } from '../types.js'
import { toGraphQLDirective } from './Directive.js'
import { fromGraffleSelectionObjectLevel } from './GraffleSelectionObjectLevel.js'

export const collectForInlineFragmentLike: GraphQLPostOperationMapper<
  SchemaDrivenDataMap.OutputObject,
  void,
  [
    keyParsed: Select.ParsedInlineFragmentLevelSelection,
    basket: {
      directives: Grafaid.Nodes.DirectiveNode[]
      selections: Grafaid.Nodes.SelectionNode[]
    },
  ]
> = (
  context,
  sddm,
  keyParsed,
  basket,
) => {
  switch (keyParsed.type) {
    case `Directive`: {
      const directive = toGraphQLDirective(context, sddm, keyParsed)
      if (directive) basket.directives.push(directive)
      break
    }
    default: {
      basket.selections.push(...fromGraffleSelectionObjectLevel(context, sddm, keyParsed))
    }
  }
}
