import { createPrefilled } from '../../../../../../src/entrypoints/client.js'
import { $defaultSchemaUrl, $Index } from './SchemaRuntime.js'

export const create = createPrefilled(`MutationOnly`, $Index, $defaultSchemaUrl)
