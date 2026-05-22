import { hooks, setConfig } from '@faustwp/core';
import templates from './wp-templates';
import possibleTypes from './possibleTypes.json';

hooks.addFilter(
  'graphqlEndpoint',
  'destinasian/graphql-endpoint',
  (graphqlEndpoint) => {
    // Optional local/server proxy mode (non-static runtime).
    if (
      typeof window !== 'undefined' &&
      process.env.NEXT_PUBLIC_USE_WORDPRESS_PROXY === 'true'
    ) {
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
