import * as core from "@actions/core";
import run from "./scripts/commit-bitmap";

try {
  const wsDir: string = core.getInput("ws-dir") || process.env.WSDIR || "./";
  const gitUserName = core.getInput("git-user-name");
  const gitUserEmail = core.getInput("git-user-email");
  const skipPush: string | undefined = core.getInput("skip-push");
  run(skipPush, gitUserName, gitUserEmail, wsDir);
} catch (error) {
  core.setFailed((error as Error).message);
}
