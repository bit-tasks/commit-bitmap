export type ExecFunction = (command: string, options?: {cwd: string}) => Promise<number>;

const run: (exec: ExecFunction, skipPush: string, wsdir: string) => Promise<void> = async (exec, skipPush, wsdir) => {
  await exec('git add .bitmap', { cwd: wsdir });
  await exec('git commit -m "update .bitmap with new component versions (automated). [skip-ci]"', { cwd: wsdir });
 
  if(!skipPush){
    await exec('git push', { cwd: wsdir });
  }
}

export default run;
