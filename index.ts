import * as core from "@actions/core";
import { exec } from "@actions/exec";
import run, { ExecFunction } from "./scripts/commit-bitmap";

try {
  const wsDir: string = core.getInput("ws-dir") || process.env.WSDIR || "./";
  const skipPush: string | undefined = core.getInput('skip-push');
  const stdExec: ExecFunction = (command: string, options?: {cwd: string}): Promise<number> => exec(command, [], options);
  run(stdExec, skipPush, wsDir);
} catch (error) {
  core.setFailed((error as Error).message);
}
