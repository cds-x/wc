import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { fromRollup } from '@web/dev-server-rollup';
import baseConfig from './web-dev-server.config.mjs';
import execute from 'rollup-plugin-shell';

const filteredLogs = ['Running in dev mode', 'lit-html is in dev mode'];

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  /** Test files to run */
  files: ['./src/**/*.spec.ts'],

  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  /** Filter out lit dev mode logs */
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (typeof arg === 'string' && filteredLogs.some(l => arg.includes(l))) {
        return false;
      }
    }
    return true;
  },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto',

  /** Amount of browsers to run concurrently */
  // concurrentBrowsers: 2,

  /** Amount of test files per browser to test concurrently */
  // concurrency: 1,

  /** Browsers to run tests on */
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
  //   playwrightLauncher({ product: 'firefox' }),
  //   playwrightLauncher({ product: 'webkit' }),
  ],

  // See documentation for all available options
  plugins: [
    ...baseConfig.plugins,
    esbuildPlugin({ ts: true, json: true, target: 'auto' }),
    fromRollup(execute)({
      commands: [`tsc --noEmit src/**/*.spec.ts`],
      hook: 'writeBundle',
    }),
  ]
});


// /**
//  * Web Test Runner
//  *
//  * This configures Cdx unit tests to run using @web/test-runner
//  */
//
// import { playwrightLauncher } from '@web/test-runner-playwright';
// import { esbuildPlugin } from '@web/dev-server-esbuild';
// import { fromRollup } from '@web/dev-server-rollup';
// import execute from 'rollup-plugin-shell';
// import baseConfig from './web-dev-server.config.mjs';
//
// export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
//   // uncomment open/manual to debug in browser
//   // open: true,
//   // manual: true,
//   testFramework: {
//     config: {
//       styles: ['./dist/lib/global.min.css'],
//       ui: 'bdd',
//       timeout: '60000',
//     },
//   },
//   files: ['./src/**/*.spec.ts'],
//   testsFinishTimeout: 60000,
//   nodeResolve: true,
//   browsers: [playwrightLauncher({ product: 'chromium' })],
//   coverageConfig: {
//     require: ['ts-node/register'],
//     extension: ['.ts'],
//     exclude: [
//       '**/*.d.ts',
//       '**/*.scss.js',
//       '**/node_modules/**',
//       '**/test/**',
//       '**/dist/core/**/index.js',
//       '**/dist/core/**/register.js',
//     ],
//     report: true,
//     reportDir: 'dist/coverage',
//     threshold: {
//       statements: 90,
//       branches: 85,
//       functions: 85,
//       lines: 90,
//     },
//   },
//   plugins: [
//     ...baseConfig.plugins,
//     esbuildPlugin({ ts: true, json: true, target: 'auto' }),
//     fromRollup(execute)({
//       commands: [`tsc --noEmit src/**/*.spec.ts`],
//       hook: 'writeBundle',
//     }),
//   ],
// });
