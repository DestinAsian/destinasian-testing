import { hooks, setConfig } from '@faustwp/core';
import templates from './wp-templates';
import possibleTypes from './possibleTypes.json';

hooks.addFilter(
  'graphqlEndpoint',
  'destinasian/graphql-endpoint',
  (graphqlEndpoint) => {
    // Avoid CORS on client-side Apollo requests by routing through same-origin API route.
    if (typeof window !== 'undefined') {
      return '/api/graphql';
    }

    return graphqlEndpoint;
  },
);

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
});
