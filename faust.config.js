import { hooks, setConfig } from '@faustwp/core'
import templates from './wp-templates'
import possibleTypes from './possibleTypes.json'

hooks.addFilter(
  'graphqlEndpoint',
  'destinasian/local-graphql-proxy',
  (graphqlEndpoint) => {
    if (typeof window !== 'undefined') {
      return '/api/graphql'
    }

    return graphqlEndpoint
  },
)

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  experimentalPlugins: [],
  experimentalToolbar: true,
  possibleTypes,
  useGETForQueries: false,
  usePersistedQueries: false,
})
