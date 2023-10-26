import { spawn } from 'child_process';
import { promisify } from 'util';

export interface ServeExecutorOptions {
  serverPath: string;
  port: number;
}

export default async function runExecutor(options: ServeExecutorOptions) {
  console.log('Executor ran for Serve', options);
  console.info(`Options: ${JSON.stringify(options)}}`);

  const server = spawn(
    `npx remix-serve ${options.serverPath} -- --port ${options.port}`
  );

  server.stdout.on('data', (data) => console.log(data));
  server.stderr?.on('data', (data) => console.error(data));
  server.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  return { success: true };
}
