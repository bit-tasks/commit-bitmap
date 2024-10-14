# Commit Bitmap for CI/CD Pipelines
Commit back the Bitmap file for CI/CD pipelines

# GitHub Actions

This task commits back the updated `.Bitmap`, `pnpm-lock.yaml` and `workspace.jsonc` files to the Git repository after exporting the components to a remote scope.

## Inputs

### `ws-dir`

**Optional** The workspace directory path from the root. Default `"Dir specified in Init Task or ./"`.

### `skip-push`

**Optional** Skip push for testing purposes.

### `skip-ci`

**Optional** The Git commit message includes `[skip-ci]` to disable subsequent CI triggers as a result of the file modifications. Use `skip-ci: 'false'` to remove it.

## Example usage

**Note:** Use `bit-task/init@v1` as a prior step in your action before running `bit-tasks/commit-bitmap@v1`.

```yaml
name: Test Commit Bitmap
on:
  workflow_dispatch:
permissions:
  contents: write
jobs:
  release:
    runs-on: ubuntu-latest
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      GIT_USER_NAME: ${{ secrets.GIT_USER_NAME }}
      GIT_USER_EMAIL: ${{ secrets.GIT_USER_EMAIL }}
      BIT_CONFIG_ACCESS_TOKEN: ${{ secrets.BIT_CONFIG_ACCESS_TOKEN }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Initialize Bit
        uses: bit-tasks/init@v1
        with:
          ws-dir: '<WORKSPACE_DIR_PATH>'
      - name: Commit Bitmap
        uses: bit-tasks/commit-bitmap@v1
```

# Contributor Guide

Steps to create custom tasks in different CI/CD platforms.

## GitHub Actions

Go to the GithHub action task directory and build using NCC compiler. For example;

```
npm install
npm run build
git commit -m "Update task"
git tag -a -m "action release" v1 --force
git push --follow-tags
```

For more information, refer to [Create a javascript action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)
