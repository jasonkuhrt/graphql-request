/* eslint-disable */

import * as $ from '../../../../src/Schema/__.js'
import * as $Scalar from './Scalar.js'

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Query = $.Object$(`Query`, {
  id: $.field($.Output.Nullable($Scalar.ID)),
})

export const $Index = {
  Root: {
    Query,
    Mutation: null,
    Subscription: null,
  },
  objects: {},
  unions: {},
  interfaces: {},
}
