import { exec } from "@actions/exec";

const run = async (
  skipPush: string,
  gitUserName: string,
  gitUserEmail: string,
  wsdir: string
) => {
  await exec(`git config --global user.name "${gitUserName}"`, [], {
    cwd: wsdir,
  });
  await exec(`git config --global user.email "${gitUserEmail}"`, [], {
    cwd: wsdir,
  });
  await exec("git add .bitmap", [], { cwd: wsdir });

  try {
    await exec(
      'git commit -m "update .bitmap with new component versions (automated). [skip-ci]"',
      [],
      { cwd: wsdir }
    );
  } catch (error) {
    console.error(`Error while committing changes`);
  }

  if (!skipPush) {
    await exec("git push", [], { cwd: wsdir });
  }
};

export default run;
