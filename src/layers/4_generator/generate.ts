import fs from 'node:fs/promises'
import { ModuleGeneratorRuntimeSchemaDrivenData } from '../7_customScalars/generator/RuntimeIndexCustomScalars.js'
import { type Config, createConfig, type Input } from './config.js'
import { ModuleGenerator_ } from './generators/_.js'
import { ModuleGenerator__ } from './generators/__.js'
import { ModuleGeneratorClient } from './generators/Client.js'
import { ModuleGeneratorData } from './generators/Data.js'
import { ModuleGeneratorError } from './generators/Error.js'
import { ModuleGeneratorGlobal } from './generators/global.js'
import { ModuleGeneratorMethodsDocument } from './generators/MethodsDocument.js'
import { ModuleGeneratorMethodsRoot } from './generators/MethodsRoot.js'
import { ModuleGeneratorMethodsSelect } from './generators/MethodsSelect.js'
import { ModuleGeneratorScalar } from './generators/Scalar.js'
import { ModuleGeneratorSchemaBuildtime } from './generators/SchemaBuildtime.js'
import { ModuleGeneratorSchemaIndex } from './generators/SchemaIndex.js'
import { ModuleGeneratorSchemaRuntime } from './generators/SchemaRuntime.js'
import { ModuleGeneratorSelect } from './generators/Select.js'
import { ModuleGeneratorSelectionSets } from './generators/SelectionSets.js'
import type { GeneratedModule } from './helpers/moduleGenerator.js'
import { getTypeScriptFormatterOrPassthrough, passthroughFormatter } from './helpers/typeScriptFormatter.js'

export const generate = async (input: Input) => {
  const config = await createConfig(input)
  const generatedModules = await generateCode(config)

  // todo clear directory before generating so that removed or renamed files are cleaned up.
  await fs.mkdir(config.paths.project.outputs.root, { recursive: true })
  await fs.mkdir(config.paths.project.outputs.modules, { recursive: true })

  await Promise.all(
    generatedModules.map((generatedModule) => {
      const isExportsModule = generatedModule.name.match(/^_+$/) !== null
      const filePath = `${config.paths.project.outputs.root}/${
        isExportsModule ? `` : `modules/`
      }${generatedModule.name}.ts`
      return fs.writeFile(filePath, generatedModule.content, {
        encoding: `utf8`,
      })
    }),
  )
}

const generateCode = async (config: Config): Promise<GeneratedModule[]> => {
  const typeScriptFormatter = config.options.format ? await getTypeScriptFormatterOrPassthrough() : passthroughFormatter

  return [
    ModuleGeneratorGlobal,
    ModuleGeneratorClient,
    ModuleGeneratorData,
    ModuleGeneratorError,
    ModuleGeneratorScalar,
    // Packaging Stuff
    ModuleGenerator__,
    ModuleGenerator_,
    // Schema Stuff
    ModuleGeneratorSchemaIndex,
    ModuleGeneratorSchemaBuildtime,
    ModuleGeneratorSchemaRuntime,
    ModuleGeneratorRuntimeSchemaDrivenData,
    // Interface Stuff
    ModuleGeneratorSelectionSets,
    ModuleGeneratorSelect,
    ModuleGeneratorMethodsSelect,
    ModuleGeneratorMethodsRoot,
    ModuleGeneratorMethodsDocument,
  ].map(generator => generator.generate(config)).map(code => ({
    ...code,
    content: typeScriptFormatter.formatText(code.content),
  }))
}
