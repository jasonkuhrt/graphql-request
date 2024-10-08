import { linesPrepend, linesTrim } from './text.js'

export namespace Code {
  export const propertyAccess = (object: string, name: string) => `${object}.${name}`
  export const string = (str: string) => `"${str}"`
  export const nullable = (type: string) => `${type} | null`
  export const union = (name: string, types: string[]) => `type ${name} =\n| ${Code.unionItems(types)}`
  export const unionItems = (types: string[]) => types.join(`\n| `)
  export const tuple = (types: string[]) => `[${types.join(`, `)}]`
  export const list = (type: string) => `Array<${type}>`
  export const termField = (name: string, type: string, options?: { comma?: boolean }) => {
    return `${name}: ${type}${(options?.comma ?? true) ? `,` : ``}`
  }
  export const field = (name: string, type: string, options?: { optional?: boolean }) => {
    if (options?.optional) return `${name}?: ${type}`
    return `${name}: ${type}`
  }
  export const optionalField = (name: string, type: string) => Code.field(name, type, { optional: true })
  export const fields = (fieldTypes: string[]) => fieldTypes.join(`\n`)
  export const intersection = (a: string, b: string) => `${a} & ${b}`
  export const object = (fields: string) => `{\n${fields}\n}`
  export const objectFromEntries = (entries: readonly (readonly [string, string])[]) =>
    Code.objectFrom(Object.fromEntries(entries.map(([name, type]) => [name, { type }])))
  export const objectFrom = (
    object: Record<
      string,
      null | string | boolean | number | { type: null | string | boolean | number; optional?: boolean; tsdoc?: string }
    >,
  ) => {
    return Code.object(
      Code.fields(
        Object.entries(object).map(([name, spec]) =>
          [name, spec && typeof spec === `object` ? spec : { type: spec }] as const
        )
          .map((
            [name, spec],
          ) => Code.field(name, String(spec.type), { optional: spec.optional })),
      ),
    )
  }
  export const boolean = (value: boolean) => value ? `true` : `false`
  export const type = (name: string, type: string) => `type ${name} = ${type}`
  export const interface$ = (name: string, object: string) => `interface ${name} ${object}`
  export const export$ = (thing: string) => `export ${thing}`
  export const TSDoc = <$Content extends string | null>(content: $Content): $Content => {
    return (content === null ? null : `/**\n${linesPrepend(`* `, linesTrim(content)) || `*`}\n*/`) as $Content
  }
  export const TSDocWithBlock = (content: string | null, block: string) => {
    const tsDoc = TSDoc(content)
    return tsDoc === null ? block : `${tsDoc}\n${block}`
  }

  export const namespace = (name: string, content: string) => `namespace ${name} ${Code.object(content)}`
  export const group = (...content: string[]) => content.join(`\n`)
  export const commentSectionTitle = (title: string) => {
    const lineSize = 60
    const line = `-`.repeat(lineSize)
    const titlePrefixSpace = ` `.repeat(Math.round(lineSize / 2) - Math.round(title.length / 2))
    const titleSuffixSpace = ` `.repeat(lineSize - (titlePrefixSpace.length + title.length))
    return `\n\n// ${line} //\n// ${titlePrefixSpace + title + titleSuffixSpace} //\n// ${line} //\n\n`
  }

  export const reservedTypeScriptInterfaceNames = [
    `break`,
    `case`,
    `catch`,
    `class`,
    `const`,
    `continue`,
    `debugger`,
    `default`,
    `delete`,
    `do`,
    `else`,
    `enum`,
    `export`,
    `extends`,
    `false`,
    `finally`,
    `for`,
    `function`,
    `if`,
    `import`,
    `in`,
    `instanceof`,
    `new`,
    `null`,
    `return`,
    `super`,
    `switch`,
    `this`,
    `throw`,
    `true`,
    `try`,
    `typeof`,
    `var`,
    `void`,
    `while`,
    `with`,
    `implements`,
    `any`,
    `boolean`,
    `never`,
    `number`,
    `object`,
    `string`,
    `symbol`,
    `undefined`,
    `unknown`,
    `bigint`,
    `break`,
    `with`,
    `break`,
    `of`,
    `interface`,
  ]
}
