'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const devkit_1 = require('@nx/devkit');
const async_iterable_1 = require('@nx/devkit/src/utils/async-iterable');
const wait_for_port_open_1 = require('@nx/web/src/utils/wait-for-port-open');
const node_child_process_1 = require('node:child_process');
const node_path_1 = require('node:path');
function normalizeOptions(schema) {
  var _a, _b, _c;
  return Object.assign(Object.assign({}, schema), {
    port: (_a = schema.port) !== null && _a !== void 0 ? _a : 4200,
    debug: (_b = schema.debug) !== null && _b !== void 0 ? _b : false,
    manual: (_c = schema.manual) !== null && _c !== void 0 ? _c : false,
  });
}
function buildRemixDevArgs(options) {
  const env = {};
  const args = [];
  const serverPath = 'build/index.js';
  env.HOST = '127.0.0.1';
  env.REMIX_DEV_ORIGIN = 'http://localhost';

  if (options.command) {
    args.push(`--command=${options.command}`);
  }
  if (options.host) {
    env.HOST = options.host;
  }
  // if (options.port) {
  //     env.PORT = options.port;
  // }
  if (options.debug) {
    args.push(`--debug`);
  }
  if (options.manual) {
    args.push(`--manual`);
  }
  if (options.tlsKey) {
    args.push(`--tls-key=${options.tlsKey}`);
  }
  if (options.tlsCert) {
    args.push(`--tls-cert=${options.tlsCert}`);
  }
  return { env, args };
}
function serveExecutor(schema, context) {
  return tslib_1.__asyncGenerator(this, arguments, function* serveExecutor_1() {
    const options = normalizeOptions(schema);
    const projectRoot = context.workspace.projects[context.projectName].root;
    const remixBin = require.resolve('@remix-run/dev/dist/cli');
    const args = buildRemixDevArgs(options);
    // Cast to any to overwrite NODE_ENV
    process.env.NODE_ENV = process.env.NODE_ENV
      ? process.env.NODE_ENV
      : 'development';
    process.env.PORT = `${options.port}`;
    console.log(args);
    console.log(remixBin);
    yield tslib_1.__await(
      yield* tslib_1.__asyncDelegator(
        tslib_1.__asyncValues(
          (0, async_iterable_1.createAsyncIterable)(({ done, next, error }) =>
            tslib_1.__awaiter(this, void 0, void 0, function* () {
              const server = (0, node_child_process_1.fork)(
                remixBin,
                [...args.args],
                {
                  cwd: (0, node_path_1.join)(
                    devkit_1.workspaceRoot,
                    projectRoot
                  ),
                  stdio: 'inherit',
                }
              );
              server.once('exit', (code) => {
                if (code === 0) {
                  done();
                } else {
                  error(new Error(`Remix app exited with code ${code}`));
                }
              });
              const killServer = () => {
                if (server.connected) {
                  server.kill('SIGTERM');
                }
              };
              process.on('exit', () => killServer());
              process.on('SIGINT', () => killServer());
              process.on('SIGTERM', () => killServer());
              process.on('SIGHUP', () => killServer());
              yield (0, wait_for_port_open_1.waitForPortOpen)(options.port);
              next({
                success: true,
                baseUrl: `http://localhost:${options.port}`,
              });
            })
          )
        )
      )
    );
  });
}
exports.default = serveExecutor;
//# sourceMappingURL=serve.impl.js.map
