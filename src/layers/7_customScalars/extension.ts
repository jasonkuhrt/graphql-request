import { createExtension } from '../6_client/extension/extension.js'
import { decodeCustomScalars } from './decode.js'

export const CustomScalars = () =>
  createExtension({
    name: `CustomScalars`,
    onRequest: (async ({ pack }) => {
      const { exchange } = await pack()
      const { unpack } = await exchange()
      const { decode } = await unpack()

      // If there has been an error and we definitely don't have any data, such as when
      // giving an operation name that doesn't match any in the document,
      // then don't attempt to decode.
      const isError = !decode.input.result.data && (decode.input.result.errors?.length ?? 0) > 0

      if (decode.input.schemaIndex && !isError) {
        decodeCustomScalars({
          data: decode.input.result.data,
          sddm: decode.input.schemaIndex.customScalars.input, // todo drop input/output separation
          request: pack.input.request,
        })
      }

      return await decode()
    }),
  })
