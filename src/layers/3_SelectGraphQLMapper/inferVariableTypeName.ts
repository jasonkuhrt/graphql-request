import { isScalar } from '../1_Schema/Hybrid/types/Scalar/Scalar.js'
import type { SchemaDrivenDataMap } from '../7_customScalars/generator/SchemaDrivenDataMap.js'

export const inferTypeName = (sddmArgLike: SchemaDrivenDataMap.ArgumentOrInputField): string => {
  if (sddmArgLike.it) {
    const isRequiredIndicator = sddmArgLike.it[0] === 1 ? `!` : ``
    const namedType = inferNamedType(sddmArgLike)
    return inferTypeInline(sddmArgLike.it[1], namedType) + isRequiredIndicator
  }
  return inferNamedType(sddmArgLike)
}

const inferTypeInline = (sddmInlineType: undefined | SchemaDrivenDataMap.InlineType, typeName: string): string => {
  if (!sddmInlineType) return typeName
  const isRequiredIndicator = sddmInlineType[0] === 1 ? `!` : ``
  return `[${inferTypeInline(sddmInlineType[1], typeName)}${isRequiredIndicator}]`
}

const inferNamedType = (index: SchemaDrivenDataMap.ArgumentOrInputField): string => {
  if (isScalar(index.nt)) {
    return index.nt.name
  }

  if (index.nt?.n) {
    return index.nt.n
  }

  throw new Error(`Unknown index item: ${String(index)}`)
}
