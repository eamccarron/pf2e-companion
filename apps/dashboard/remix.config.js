  /**
   * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  dev: {
    port: 4200,
  },
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  serverPlatform: 'node',
  serverModuleFormat: 'cjs',
  serverBuildPath: 'build/index.js',
  serverMainFields: ['main', 'module'],
  serverMinify: false,
  publicPath: '/build/',
  watchPaths: () => require('@nx/remix').createWatchPaths(__dirname),
};
