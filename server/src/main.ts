import { CommandFactory } from 'nest-commander';
import { ChildProcess, fork } from 'node:child_process';
import { dirname, join } from 'node:path';
import { Worker } from 'node:worker_threads';
import { ImmichAdminModule } from 'src/app.module';
import { ImmichWorker, LogLevel } from 'src/enum';
import { ConfigRepository } from 'src/repositories/config.repository';

const immichApp = process.argv[2];
if (immichApp) {
  process.argv.splice(2, 1);
}

let apiProcess: ChildProcess | undefined;

const onError = (name: string, error: Error) => {
  console.error(`${name} worker error: ${error}, stack: ${error.stack}`);
};

const onExit = (name: string, exitCode: number | null) => {
  if (exitCode !== 0) {
    console.error(`${name} worker exited with code ${exitCode}`);

    if (apiProcess && name !== ImmichWorker.Api) {
      console.error('Killing api process');
      apiProcess.kill('SIGTERM');
      apiProcess = undefined;
    }
  }

  process.exit(exitCode);
};

function bootstrapWorker(name: ImmichWorker) {
  console.log(`Starting ${name} worker`);

  // eslint-disable-next-line unicorn/prefer-module
  const basePath = dirname(__filename);
  const workerFile = join(basePath, 'workers', `${name}.js`);

  let worker: Worker | ChildProcess;
  if (name === ImmichWorker.Api) {
    worker = fork(workerFile, [], {
      execArgv: process.execArgv.map((arg) => (arg.startsWith('--inspect') ? '--inspect=0.0.0.0:9231' : arg)),
    });
    apiProcess = worker;
  } else {
    worker = new Worker(workerFile);
  }

  worker.on('error', (error) => onError(name, error));
  worker.on('exit', (exitCode) => onExit(name, exitCode));
}

function bootstrap() {
  if (immichApp === 'immich-admin') {
    process.title = 'immich_admin_cli';
    process.env.IMMICH_LOG_LEVEL = LogLevel.Warn;
    return CommandFactory.run(ImmichAdminModule);
  }

  if (immichApp === 'immich' || immichApp === 'microservices') {
    console.error(
      `Using "start.sh ${immichApp}" has been deprecated. See https://github.com/immich-app/immich/releases/tag/v1.118.0 for more information.`,
    );
    process.exit(1);
  }

  if (immichApp) {
    console.error(`Unknown command: "${immichApp}"`);
    process.exit(1);
  }

  process.title = 'immich';
  const { workers } = new ConfigRepository().getEnv();
  for (const worker of workers) {
    bootstrapWorker(worker);
  }
}

void bootstrap();
