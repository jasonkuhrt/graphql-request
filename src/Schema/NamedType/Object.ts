/* eslint-disable @typescript-eslint/ban-types */

import type { Field } from '../Field/Field.js'
import { field } from '../Field/Field.js'
import { Output } from '../Field/Type.js'

export type Fields = Record<string, Field<any>>

export type ObjectFields = {
  __typename: Field<Output.__typename>
} & Fields

export interface Object<
  $Name extends string = string,
  $Fields extends Fields = Fields,
> {
  kind: 'Object'
  fields: {
    __typename: Field<Output.__typename<$Name>>
  } & $Fields
}

export const Object = <$Name extends string, $Fields extends Record<keyof $Fields, Field>>(
  name: $Name,
  fields: $Fields,
): Object<$Name, $Fields> => ({
  kind: `Object`,
  fields: {
    __typename: field(Output.__typename(name)),
    ...fields,
  },
})
