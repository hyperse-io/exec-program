# @hyperse/exec-program

<p align="left">
  <a aria-label="Build" href="https://github.com/hyperse-io/exec-program/actions?query=workflow%3ACI">
    <img alt="build" src="https://img.shields.io/github/actions/workflow/status/hyperse-io/exec-program/ci-integrity.yml?branch=main&label=ci&logo=github&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="stable version" href="https://www.npmjs.com/package/@hyperse/exec-program">
    <img alt="stable version" src="https://img.shields.io/npm/v/%40hyperse%2Fexec-program?branch=main&label=version&logo=npm&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="Top language" href="https://github.com/hyperse-io/exec-program/search?l=typescript">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/hyperse-io/exec-program?style=flat-square&labelColor=000&color=blue">
  </a>
  <a aria-label="Licence" href="https://github.com/hyperse-io/exec-program/blob/main/LICENSE">
    <img alt="Licence" src="https://img.shields.io/github/license/hyperse-io/ts-node-paths?style=flat-quare&labelColor=000000" />
  </a>
</p>

Runs commands in your script, application or library. Unlike shells, it is optimized for programmatic usage.

## README

- [Getting started](#getting-started)
- [Common use cases](#usage)
  - [Vitest unitest](#unit-test)

### Getting started

```bash
npm i --save @hyperse/exec-program
```

### Usage

### runTsScript

```ts
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runTsScript } from '@hyperse/exec-program';

const getDirname = (url: string, ...paths: string[]) => {
  return join(dirname(fileURLToPath(url)), ...paths);
};

const cliPath = getDirname(import.meta.url, './cli-test.ts');
const { stderr, stdout } = await runTsScript(cliPath);
console.log(stderr, stdout);
```

### execute command

```ts
import { execute } from '@hyperse/exec-program';

const { stdout, stderr } = await execute(
  'npm',
  ['i', '--no-save', '--no-package-lock', ...toInstall],
  {
    cwd: target.directory,
    maxBuffer: TEN_MEGA_BYTE,
    env: this.options.npmEnv,
  }
);
```

```ts
await execute('npm', ['pack', directory], {
  cwd: this.uniqueDir,
  maxBuffer: TEN_MEGA_BYTE,
});
```

#### run ts file for unit testing

config `tsconfig.json`

```json
{
  "extends": "@hyperse/eslint-config-hyperse/tsconfig.base.json",
  "compilerOptions": {
    ...
    "baseUrl": "./src",
    "rootDir": "./",
    "outDir": "dist",
    "types": [
      "vitest/globals"
    ],
    "paths": {
      "@hyperse/exec-program": [
        "../src/index.js"
      ],
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx"
  ]
```

create `cli-test.ts`

```ts
// cause of `tsconfig.json` we can directly import source .ts file from '@hyperse/exec-program';
import { runTsScript } from '@hyperse/exec-program';
console.log(typeof runTsScript);
console.log('cli...');
```

create test file `main.spec.ts`

```ts
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runTsScript } from '@hyperse/exec-program';

const getDirname = (url: string, ...paths: string[]) => {
  return join(dirname(fileURLToPath(url)), ...paths);
};

const cliPath = getDirname(import.meta.url, './cli-test.ts');

describe('test suites of exec program', () => {
  it('should correct invoke cli.ts', async () => {
    const { stderr, stdout } = await runTsScript(cliPath);
    console.log(stderr, stdout);
    expect(stderr).toBe('');
    expect(stdout).toMatch(/cli.../);
  });
});
```
