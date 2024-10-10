import { buildClientSchema, printSchema } from 'graphql'
import { buildSchema, type GraphQLObjectType, type GraphQLSchema } from 'graphql'
import fs from 'node:fs/promises'
import * as Path from 'node:path'
import { Graffle } from '../../entrypoints/__Graffle.js'
import { Introspection } from '../../entrypoints/extensions.js'
import { Nodes } from '../../lib/grafaid/_Nodes.js'
import { omitUndefinedKeys } from '../../lib/prelude.js'
import { fileExists, isPathToADirectory } from './helpers/fs.js'

export interface Input {
  schemaSource: {
    type: 'sdl'
    /**
     * Defaults to the source directory if set, otherwise the current working directory.
     */
    dirOrFilePath?: string
  } | {
    type: 'url'
    url: URL
  }
  outputDirPath?: string
  name?: string
  // code?: Omit<GenerateCodeInput, 'schemaSource' | 'sourceDirPath' | 'options'>
  defaultSchemaUrl?: boolean | URL
  /**
   * Defaults to the current working directory.
   */
  sourceDirPath?: string
  sourceCustomScalarCodecsFilePath?: string
  /**
   * Override import paths to graffle package within the generated code.
   * Used by Graffle test suite to have generated clients point to source
   * code. Probably not useful to you.
   */
  libraryPaths?: InputLibraryPaths
  errorTypeNamePattern?: RegExp
  /**
   * Should custom scalars definitions be imported into the generated output?
   */
  customScalars?: boolean
  format?: boolean
  TSDoc?: {
    noDocPolicy?: 'message' | 'ignore'
  }
}

interface InputLibraryPaths {
  client?: string
  schema?: string
  scalars?: string
  utilitiesForGenerated?: string
}

export interface Config {
  name: string
  paths: {
    project: {
      inputs: {
        root: string
        schema: null | string
        customScalarCodecs: string
      }
      outputs: {
        root: string
        modules: string
      }
    }
    imports: {
      customScalarCodecs: string
      grafflePackage: Required<InputLibraryPaths>
    }
  }
  schema: {
    sdl: string
    instance: GraphQLSchema
    typeMapByKind: Nodes.$Schema.KindMap.KindMap
    error: {
      objects: GraphQLObjectType[]
      enabled: boolean
    }
  }
  runtimeFeatures: {
    customScalars: boolean
    operationVariables: boolean
  }
  options: {
    defaultSchemaUrl: URL | null
    format: boolean
    errorTypeNamePattern: RegExp | null
    customScalars: boolean
    TSDoc: {
      noDocPolicy: 'message' | 'ignore'
    }
  }
}

export const defaultName = `default`

export const defaultLibraryPaths = {
  client: `graffle/client`,
  scalars: `graffle/schema/scalars`,
  schema: `graffle/schema`,
  utilitiesForGenerated: `graffle/utilities-for-generated`,
}

export const createConfig = async (input: Input): Promise<Config> => {
  // dprint-ignore
  const defaultSchemaUrl =
    typeof input.defaultSchemaUrl === `boolean`
      ? input.schemaSource.type === `url`
        ? input.schemaSource.url
        : null
      : input.defaultSchemaUrl??null

  const formattingEnabled = input.format ?? true

  const inputPathDirRoot = input.sourceDirPath ?? process.cwd()

  const outputDirPathRoot = input.outputDirPath ?? Path.join(process.cwd(), `./graffle`)

  const outputDirPathModules = Path.join(outputDirPathRoot, `/modules`)

  const inputPathCustomScalarCodecs = input.sourceCustomScalarCodecsFilePath
    ?? Path.join(inputPathDirRoot, `customScalarCodecs.ts`)

  const customScalarCodecsPathExists = await fileExists(inputPathCustomScalarCodecs)

  const customScalarCodecsImportPath = Path.relative(
    outputDirPathModules,
    inputPathCustomScalarCodecs.replace(/\.ts$/, `.js`),
  )

  const errorTypeNamePattern = input.errorTypeNamePattern ?? null

  const sourceSchema = await resolveSourceSchema(input)

  const schema = buildSchema(sourceSchema.content)
  const typeMapByKind = Nodes.$Schema.KindMap.getKindMap(schema)
  const errorObjects = errorTypeNamePattern
    ? Object.values(typeMapByKind.GraphQLObjectType).filter(_ => _.name.match(errorTypeNamePattern))
    : []

  return {
    runtimeFeatures: {
      customScalars: true, // todo do not assume true
      operationVariables: true, // todo do not assume true
    },
    name: input.name ?? defaultName,
    paths: {
      project: {
        outputs: {
          root: outputDirPathRoot,
          modules: outputDirPathModules,
        },
        inputs: {
          root: inputPathDirRoot,
          schema: sourceSchema.type === `introspection` ? null : sourceSchema.path,
          customScalarCodecs: inputPathCustomScalarCodecs,
        },
      },
      imports: {
        customScalarCodecs: customScalarCodecsImportPath,
        grafflePackage: {
          ...defaultLibraryPaths,
          ...omitUndefinedKeys(input.libraryPaths ?? {}),
        },
      },
    },
    schema: {
      sdl: sourceSchema.content,
      instance: schema,
      typeMapByKind,
      error: {
        enabled: Boolean(errorTypeNamePattern),
        objects: errorObjects,
      },
    },
    options: {
      defaultSchemaUrl,
      format: formattingEnabled,
      errorTypeNamePattern,
      customScalars: customScalarCodecsPathExists,
      TSDoc: {
        noDocPolicy: input.TSDoc?.noDocPolicy ?? `ignore`,
      },
    },
  }
}

const defaultSchemaFileName = `schema.graphql`

const resolveSourceSchema = async (
  input: Input,
): Promise<{ type: 'introspection'; content: string } | { type: 'file'; content: string; path: string }> => {
  if (input.schemaSource.type === `sdl`) {
    const fileOrDirPath = input.schemaSource.dirOrFilePath ?? input.sourceDirPath ?? process.cwd()
    const isDir = await isPathToADirectory(fileOrDirPath)
    const finalPath = isDir ? Path.join(fileOrDirPath, defaultSchemaFileName) : fileOrDirPath
    const sdl = await fs.readFile(finalPath, `utf8`)
    return { type: `file`, content: sdl, path: finalPath }
  } else {
    const graffle = Graffle.create({ schema: input.schemaSource.url }).use(Introspection({
      options: {
        directiveIsRepeatable: true,
        schemaDescription: true,
        specifiedByUrl: true,
        inputValueDeprecation: true,
        // todo oneOf
      },
    }))
    const data = await graffle.introspect()
    if (!data) {
      throw new Error(`No data returned for introspection query.`)
    }
    const schema = buildClientSchema(data)
    const sdl = printSchema(schema)
    return { type: `introspection`, content: sdl }
  }
}
