# Commit Bitmap for CI/CD Pipelines
Commit back the Bitmap file for CI/CD pipelines

# GitHub Actions

This CD Task, commits back the Bitmap file to the Git repository after exporting the components to a remote scope

## Inputs

### `ws-dir`

**Optional** The workspace directory path from the root. Default `"Dir specified in Init Task or ./"`.

### `git-user-name`

**Required** Github user name to commit back .bitmap file to the repository.

### `git-user-email`

**Required** Github user email to commit back .bitmap file to the repository.

### `skip-push`

**Optional** Skip push for testing purposes
.
## Example usage

Define the `bit-tasks/commit-bitmap@v1` action in your pipeline before using the Verify.

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
      BIT_TOKEN: ${{ secrets.BIT_TOKEN }}
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Initialize Bit
        uses: bit-tasks/init@v1
        with:
          ws-dir: '<WORKSPACE_DIR_PATH>'
      - name: Bit Pull Request
        uses: bit-tasks/commit-bitmap@v1
        with:
            git-user-name: '<GIT_USER_NAME>'
            git-user-email: '<GIT_USER_EMAIL>'
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

For more information refer [Create a javascript action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)

## GitLab CI/CD

For more information refer [Specify a custom CI/CD file](https://docs.gitlab.com/ee/ci/pipelines/settings.html#specify-a-custom-cicd-configuration-file)

## Azure DevOps

For more information refer [Add build task](https://learn.microsoft.com/en-us/azure/devops/extend/develop/add-build-task?view=azure-devops)
