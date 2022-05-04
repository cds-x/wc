/**
 * Sandbox Web Dev Server
 *
 * Provides a demo dev env in ./demo
 */

import baseConfig from './web-dev-server.config.mjs';

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  ...baseConfig,
  open: './demo/'
});
