import type * as $ from '../../../../../../src/entrypoints/schema.js'
import type * as $Scalar from './Scalar.js'

// ------------------------------------------------------------ //
//                             Root                             //
// ------------------------------------------------------------ //
export namespace Root {
  export type Mutation = $.Output.ObjectMutation<{
    id: $.Field<'id', $.Output.Nullable<$Scalar.ID>, null>
    idNonNull: $.Field<'idNonNull', $Scalar.ID, null>
  }>
}
// ------------------------------------------------------------ //
//                             Enum                             //
// ------------------------------------------------------------ //
export namespace Enum {
  // -- no types --
}
// ------------------------------------------------------------ //
//                         InputObject                          //
// ------------------------------------------------------------ //
export namespace InputObject {
  // -- no types --
}
// ------------------------------------------------------------ //
//                          Interface                           //
// ------------------------------------------------------------ //
export namespace Interface {
  // -- no types --
}
// ------------------------------------------------------------ //
//                            Object                            //
// ------------------------------------------------------------ //
export namespace Object {
  // -- no types --
}
// ------------------------------------------------------------ //
//                            Union                             //
// ------------------------------------------------------------ //
export namespace Union {
  // -- no types --
}
