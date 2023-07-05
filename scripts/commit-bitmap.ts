export type ExecFunction = (command: string, options?: {cwd: string}) => Promise<number>;

const run: (exec: ExecFunction, skipPush: string, gitUserName: string, gitUserEmail: string, wsdir: string) => Promise<void> = async (exec, skipPush, gName, gEmail, wsdir) => {

  await exec(`git config --global user.name "${gName}"`, { cwd: wsdir });
  await exec(`git config --global user.email "${gEmail}"`, { cwd: wsdir });
  await exec('git add .bitmap', { cwd: wsdir });

  try {
    await exec('git commit -m "update .bitmap with new component versions (automated). [skip-ci]"', { cwd: wsdir });
  } catch (error) {
    console.error(`Error while committing changes`);
  }
 
  if(!skipPush){
    await exec('git push', { cwd: wsdir });
  }
}

export default run;
