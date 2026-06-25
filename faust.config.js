import { hooks, setConfig } from '@faustwp/core'
import templates from './wp-templates'
import possibleTypes from './possibleTypes.json'

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
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

export default setConfig({
  templates,
  experimentalPlugins: [],
  experimentalToolbar: false,
  useGETForQueries: false,
  possibleTypes,
})
