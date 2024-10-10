import type { StandardScalarRuntimeTypes } from './Scalar.js'

export type Codec<$Decoded = any, $Encoded extends StandardScalarRuntimeTypes = StandardScalarRuntimeTypes> = {
  encode: <$$Decoded extends $Decoded>(value: $$Decoded) => $Encoded
  decode: <$$Encoded extends $Encoded>(value: $$Encoded) => $Decoded
}

export const createCodec = <$Decoded, $Encoded extends StandardScalarRuntimeTypes>(codec: {
  encode: (value: $Decoded) => $Encoded
  decode: (value: $Encoded) => $Decoded
}): Codec<$Decoded, $Encoded> => codec
