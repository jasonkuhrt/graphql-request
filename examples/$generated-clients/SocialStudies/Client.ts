import { createPrefilled } from '../../../src/entrypoints/graffle/client.js'

import { $defaultSchemaUrl, $Index } from './SchemaRuntime.js'

export const create = createPrefilled(`SocialStudies`, $Index, $defaultSchemaUrl)