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

  export type Query = $.Output.ObjectQuery<{
    InputObjectNested: $.Field<
      'InputObjectNested',
      $.Output.Nullable<$Scalar.ID>,
      $.Args<{
        input: $.Input.Field<$.Input.Nullable<InputObject.InputObjectNested>>
      }, true>
    >
    InputObjectNestedNonNull: $.Field<
      'InputObjectNestedNonNull',
      $.Output.Nullable<$Scalar.ID>,
      $.Args<{
        input: $.Input.Field<InputObject.InputObjectNestedNonNull>
      }, false>
    >
    /**
     * Query enum field documentation.
     */
    abcEnum: $.Field<'abcEnum', $.Output.Nullable<Enum.ABCEnum>, null>
    argInputObjectCircular: $.Field<
      'argInputObjectCircular',
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        input: $.Input.Field<$.Input.Nullable<InputObject.InputObjectCircular>>
      }, true>
    >
    date: $.Field<'date', $.Output.Nullable<$Scalar.Date>, null>
    dateArg: $.Field<
      'dateArg',
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        date: $.Input.Field<$.Input.Nullable<$Scalar.Date>>
      }, true>
    >
    dateArgInputObject: $.Field<
      'dateArgInputObject',
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        input: $.Input.Field<$.Input.Nullable<InputObject.InputObject>>
      }, true>
    >
    dateArgList: $.Field<
      'dateArgList',
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        date: $.Input.Field<$.Input.Nullable<$.Input.List<$Scalar.Date>>>
      }, true>
    >
    dateArgNonNull: $.Field<
      'dateArgNonNull',
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        date: $.Input.Field<$Scalar.Date>
      }, false>
    >
    dateArgNonNullList: $.Field<
      'dateArgNonNullList',
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        date: $.Input.Field<$.Input.List<$.Input.Nullable<$Scalar.Date>>>
      }, false>
    >
    dateArgNonNullListNonNull: $.Field<
      'dateArgNonNullListNonNull',
      $.Output.Nullable<$Scalar.Date>,
      $.Args<{
        date: $.Input.Field<$.Input.List<$Scalar.Date>>
      }, false>
    >
    dateInterface1: $.Field<'dateInterface1', $.Output.Nullable<Interface.DateInterface1>, null>
    dateList: $.Field<'dateList', $.Output.Nullable<$.Output.List<$Scalar.Date>>, null>
    dateListList: $.Field<'dateListList', $.Output.Nullable<$.Output.List<$.Output.List<$Scalar.Date>>>, null>
    dateListNonNull: $.Field<'dateListNonNull', $.Output.List<$Scalar.Date>, null>
    dateNonNull: $.Field<'dateNonNull', $Scalar.Date, null>
    dateObject1: $.Field<'dateObject1', $.Output.Nullable<Object.DateObject1>, null>
    dateUnion: $.Field<'dateUnion', $.Output.Nullable<Union.DateUnion>, null>
    error: $.Field<
      'error',
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        case: $.Input.Field<$.Input.Nullable<$Scalar.String>>
      }, true>
    >
    id: $.Field<'id', $.Output.Nullable<$Scalar.ID>, null>
    idNonNull: $.Field<'idNonNull', $Scalar.ID, null>
    interface: $.Field<'interface', $.Output.Nullable<Interface.Interface>, null>
    interfaceNonNull: $.Field<'interfaceNonNull', Interface.Interface, null>
    interfaceWithArgs: $.Field<
      'interfaceWithArgs',
      $.Output.Nullable<Interface.Interface>,
      $.Args<{
        id: $.Input.Field<$Scalar.ID>
      }, false>
    >
    listInt: $.Field<'listInt', $.Output.Nullable<$.Output.List<$.Output.Nullable<$Scalar.Int>>>, null>
    listIntNonNull: $.Field<'listIntNonNull', $.Output.List<$Scalar.Int>, null>
    listListInt: $.Field<
      'listListInt',
      $.Output.Nullable<$.Output.List<$.Output.Nullable<$.Output.List<$.Output.Nullable<$Scalar.Int>>>>>,
      null
    >
    listListIntNonNull: $.Field<'listListIntNonNull', $.Output.List<$.Output.List<$Scalar.Int>>, null>
    lowerCaseUnion: $.Field<'lowerCaseUnion', $.Output.Nullable<Union.lowerCaseUnion>, null>
    object: $.Field<'object', $.Output.Nullable<Object.Object1>, null>
    objectList: $.Field<'objectList', $.Output.Nullable<$.Output.List<Object.Object1>>, null>
    objectListNonNull: $.Field<'objectListNonNull', $.Output.List<Object.Object1>, null>
    objectNested: $.Field<'objectNested', $.Output.Nullable<Object.ObjectNested>, null>
    objectNonNull: $.Field<'objectNonNull', Object.Object1, null>
    objectWithArgs: $.Field<
      'objectWithArgs',
      $.Output.Nullable<Object.Object1>,
      $.Args<{
        boolean: $.Input.Field<$.Input.Nullable<$Scalar.Boolean>>
        float: $.Input.Field<$.Input.Nullable<$Scalar.Float>>
        id: $.Input.Field<$.Input.Nullable<$Scalar.ID>>
        int: $.Input.Field<$.Input.Nullable<$Scalar.Int>>
        string: $.Input.Field<$.Input.Nullable<$Scalar.String>>
      }, true>
    >
    result: $.Field<
      'result',
      $.Output.Nullable<Union.Result>,
      $.Args<{
        case: $.Input.Field<Enum.Case>
      }, false>
    >
    resultNonNull: $.Field<
      'resultNonNull',
      Union.Result,
      $.Args<{
        case: $.Input.Field<$.Input.Nullable<Enum.Case>>
      }, true>
    >
    string: $.Field<'string', $.Output.Nullable<$Scalar.String>, null>
    stringWithArgEnum: $.Field<
      'stringWithArgEnum',
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        ABCEnum: $.Input.Field<$.Input.Nullable<Enum.ABCEnum>>
      }, true>
    >
    stringWithArgInputObject: $.Field<
      'stringWithArgInputObject',
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        input: $.Input.Field<$.Input.Nullable<InputObject.InputObject>>
      }, true>
    >
    stringWithArgInputObjectRequired: $.Field<
      'stringWithArgInputObjectRequired',
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        input: $.Input.Field<InputObject.InputObject>
      }, false>
    >
    /**
     * The given arguments are reflected back as a JSON string.
     */
    stringWithArgs: $.Field<
      'stringWithArgs',
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        boolean: $.Input.Field<$.Input.Nullable<$Scalar.Boolean>>
        float: $.Input.Field<$.Input.Nullable<$Scalar.Float>>
        id: $.Input.Field<$.Input.Nullable<$Scalar.ID>>
        int: $.Input.Field<$.Input.Nullable<$Scalar.Int>>
        string: $.Input.Field<$.Input.Nullable<$Scalar.String>>
      }, true>
    >
    stringWithListArg: $.Field<
      'stringWithListArg',
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        ints: $.Input.Field<$.Input.Nullable<$.Input.List<$.Input.Nullable<$Scalar.Int>>>>
      }, true>
    >
    stringWithListArgRequired: $.Field<
      'stringWithListArgRequired',
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        ints: $.Input.Field<$.Input.List<$Scalar.Int>>
      }, false>
    >
    stringWithRequiredArg: $.Field<
      'stringWithRequiredArg',
      $.Output.Nullable<$Scalar.String>,
      $.Args<{
        string: $.Input.Field<$Scalar.String>
      }, false>
    >
    unionFooBar: $.Field<'unionFooBar', $.Output.Nullable<Union.FooBarUnion>, null>
    unionFooBarNonNull: $.Field<'unionFooBarNonNull', Union.FooBarUnion, null>
    unionFooBarWithArgs: $.Field<
      'unionFooBarWithArgs',
      $.Output.Nullable<Union.FooBarUnion>,
      $.Args<{
        id: $.Input.Field<$.Input.Nullable<$Scalar.ID>>
      }, true>
    >
    unionObject: $.Field<'unionObject', $.Output.Nullable<Object.ObjectUnion>, null>
    unionObjectNonNull: $.Field<'unionObjectNonNull', Object.ObjectUnion, null>
  }>
}
// ------------------------------------------------------------ //
//                             Enum                             //
// ------------------------------------------------------------ //
export namespace Enum {
  /**
   * Enum documentation.
   *
   * Members
   * "A" - (DEPRECATED: Enum value A is deprecated.)
   * "B" - Enum B member documentation.
   * "C" - (DEPRECATED: Enum value C is deprecated.)
   */
  export type ABCEnum = $.Enum<'ABCEnum', ['A', 'B', 'C']>

  export type Case = $.Enum<'Case', ['ErrorOne', 'ErrorTwo', 'Object1']>
}
// ------------------------------------------------------------ //
//                         InputObject                          //
// ------------------------------------------------------------ //
export namespace InputObject {
  export type InputObject = $.InputObject<'InputObject', {
    date: $.Input.Field<$.Input.Nullable<$Scalar.Date>>
    dateRequired: $.Input.Field<$Scalar.Date>
    id: $.Input.Field<$.Input.Nullable<$Scalar.ID>>
    idRequired: $.Input.Field<$Scalar.ID>
  }, true>

  export type InputObjectCircular = $.InputObject<'InputObjectCircular', {
    circular: $.Input.Field<$.Input.Nullable<InputObject.InputObjectCircular>>
    date: $.Input.Field<$.Input.Nullable<$Scalar.Date>>
  }, true>

  export type InputObjectNested = $.InputObject<'InputObjectNested', {
    InputObject: $.Input.Field<$.Input.Nullable<InputObject.InputObject>>
  }, true>

  export type InputObjectNestedNonNull = $.InputObject<'InputObjectNestedNonNull', {
    InputObject: $.Input.Field<InputObject.InputObject>
  }, false>
}
// ------------------------------------------------------------ //
//                          Interface                           //
// ------------------------------------------------------------ //
export namespace Interface {
  export type DateInterface1 = $.Interface<'DateInterface1', {
    date1: $.Field<'date1', $.Output.Nullable<$Scalar.Date>, null>
  }, [Object.DateObject1]>

  export type Error = $.Interface<'Error', {
    message: $.Field<'message', $Scalar.String, null>
  }, [Object.ErrorOne, Object.ErrorTwo]>

  export type Interface = $.Interface<'Interface', {
    id: $.Field<'id', $.Output.Nullable<$Scalar.ID>, null>
  }, [Object.Object1ImplementingInterface, Object.Object2ImplementingInterface]>
}
// ------------------------------------------------------------ //
//                            Object                            //
// ------------------------------------------------------------ //
export namespace Object {
  export type Bar = $.Object$2<'Bar', {
    int: $.Field<'int', $.Output.Nullable<$Scalar.Int>, null>
  }>

  export type DateObject1 = $.Object$2<'DateObject1', {
    date1: $.Field<'date1', $.Output.Nullable<$Scalar.Date>, null>
  }>

  export type DateObject2 = $.Object$2<'DateObject2', {
    date2: $.Field<'date2', $.Output.Nullable<$Scalar.Date>, null>
  }>

  export type ErrorOne = $.Object$2<'ErrorOne', {
    infoId: $.Field<'infoId', $.Output.Nullable<$Scalar.ID>, null>
    message: $.Field<'message', $Scalar.String, null>
  }>

  export type ErrorTwo = $.Object$2<'ErrorTwo', {
    infoInt: $.Field<'infoInt', $.Output.Nullable<$Scalar.Int>, null>
    message: $.Field<'message', $Scalar.String, null>
  }>

  /**
   * Object documentation.
   */
  export type Foo = $.Object$2<'Foo', {
    /**
     * Field documentation.
     *
     * @deprecated Field a is deprecated.
     */
    id: $.Field<'id', $.Output.Nullable<$Scalar.ID>, null>
  }>

  export type Object1 = $.Object$2<'Object1', {
    boolean: $.Field<'boolean', $.Output.Nullable<$Scalar.Boolean>, null>
    float: $.Field<'float', $.Output.Nullable<$Scalar.Float>, null>
    id: $.Field<'id', $.Output.Nullable<$Scalar.ID>, null>
    int: $.Field<'int', $.Output.Nullable<$Scalar.Int>, null>
    string: $.Field<'string', $.Output.Nullable<$Scalar.String>, null>
  }>

  export type Object1ImplementingInterface = $.Object$2<'Object1ImplementingInterface', {
    id: $.Field<'id', $.Output.Nullable<$Scalar.ID>, null>
    int: $.Field<'int', $.Output.Nullable<$Scalar.Int>, null>
  }>

  export type Object2ImplementingInterface = $.Object$2<'Object2ImplementingInterface', {
    boolean: $.Field<'boolean', $.Output.Nullable<$Scalar.Boolean>, null>
    id: $.Field<'id', $.Output.Nullable<$Scalar.ID>, null>
  }>

  export type ObjectNested = $.Object$2<'ObjectNested', {
    id: $.Field<'id', $.Output.Nullable<$Scalar.ID>, null>
    object: $.Field<'object', $.Output.Nullable<Object.Object1>, null>
  }>

  export type ObjectUnion = $.Object$2<'ObjectUnion', {
    fooBarUnion: $.Field<'fooBarUnion', $.Output.Nullable<Union.FooBarUnion>, null>
  }>

  export type lowerCaseObject = $.Object$2<'lowerCaseObject', {
    id: $.Field<'id', $.Output.Nullable<$Scalar.ID>, null>
  }>

  export type lowerCaseObject2 = $.Object$2<'lowerCaseObject2', {
    int: $.Field<'int', $.Output.Nullable<$Scalar.Int>, null>
  }>
}
// ------------------------------------------------------------ //
//                            Union                             //
// ------------------------------------------------------------ //
export namespace Union {
  export type DateUnion = $.Union<'DateUnion', [Object.DateObject1, Object.DateObject2]>

  /**
   * Union documentation.
   */
  export type FooBarUnion = $.Union<'FooBarUnion', [Object.Bar, Object.Foo]>

  export type Result = $.Union<'Result', [Object.ErrorOne, Object.ErrorTwo, Object.Object1]>

  export type lowerCaseUnion = $.Union<'lowerCaseUnion', [Object.lowerCaseObject, Object.lowerCaseObject2]>
}
