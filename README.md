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

A Node.js utility for programmatically executing commands in your scripts, applications, or libraries. Unlike traditional shells, it's optimized for programmatic usage with TypeScript support.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [API Reference](#api-reference)
  - [runTsScript](#runtsscript)
  - [execute](#execute)
- [Usage Examples](#usage-examples)
  - [Running TypeScript Files](#running-typescript-files)
  - [Executing Commands](#executing-commands)
  - [Unit Testing with Vitest](#unit-testing-with-vitest)
- [Configuration](#configuration)

## Installation

```bash
npm install --save @hyperse/exec-program
```

## Features

- 🚀 Execute TypeScript files directly
- 💻 Run shell commands programmatically
- 📘 TypeScript support out of the box
- ⚡ Promise-based API
- ⚙️ Configurable execution options
- 🧪 Built-in support for unit testing

## API Reference

### runTsScript

Executes a TypeScript file and returns its output.

```typescript
/**
 * Process execute typescript script file using `@hyperse/ts-node`
 * @param program - The absolute typescript file path
 * @param options - The configuration of `execa` { env: { TS_NODE_PROJECT: tsconfig } }
 * @param args - The runtime argv for program
 */
declare const runTsScript: <T extends ExecOptions>(
  program: string,
  args?: readonly string[],
  options?: T
) => ExecResultPromise<{} & T>;
```

### execute

Executes a shell command with specified arguments and options.

```typescript
import { execute } from '@hyperse/exec-program';

/**
 * Execute a file with arguments and options
 * @param file - The program/script to execute, as a string or file URL
 * @param args - Arguments to pass to `file` on execution.
 * @param options - Options to pass to `execa`
 * @returns A `ResultPromise` that is both:
 */
declare function execute<T extends ExecOptions>(
  file: string,
  args?: readonly string[],
  options?: T
): ExecResultPromise<{} & T>;
```

## Usage Examples

### Running TypeScript Files

```typescript
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runTsScript } from '@hyperse/exec-program';

const getDirname = (url: string, ...paths: string[]) => {
  return join(dirname(fileURLToPath(url)), ...paths);
};

// Execute a TypeScript file
const cliPath = getDirname(import.meta.url, './cli-test.ts');
const { stderr, stdout } = await runTsScript(cliPath);
console.log(stderr, stdout);
```

### Executing Commands

```typescript
import { execute } from '@hyperse/exec-program';

// Install npm packages
const { stdout, stderr } = await execute(
  'npm',
  ['i', '--no-save', '--no-package-lock', ...packages],
  {
    cwd: targetDirectory,
    maxBuffer: TEN_MEGA_BYTE,
    env: npmEnv,
  }
);

// Create npm package
await execute('npm', ['pack', directory], {
  cwd: uniqueDir,
  maxBuffer: TEN_MEGA_BYTE,
});
```

### Unit Testing with Vitest

1. Configure your `tsconfig.json`:

```json
{
  "extends": "@hyperse/eslint-config-hyperse/tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": "./src",
    "rootDir": "./",
    "outDir": "dist",
    "types": ["vitest/globals"],
    "paths": {
      "@hyperse/exec-program": ["../src/index.js"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"]
}
```

2. Create a test file (`cli-test.ts`):

```typescript
import { runTsScript } from '@hyperse/exec-program';

console.log(typeof runTsScript);
console.log('cli...');
```

3. Write your test (`main.spec.ts`):

```typescript
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runTsScript } from '@hyperse/exec-program';

const getDirname = (url: string, ...paths: string[]) => {
  return join(dirname(fileURLToPath(url)), ...paths);
};

const cliPath = getDirname(import.meta.url, './cli-test.ts');

describe('test suites of exec program', () => {
  it('should correctly invoke cli.ts', async () => {
    const { stderr, stdout } = await runTsScript(cliPath);
    expect(stderr).toBe('');
    expect(stdout).toMatch(/cli.../);
  });
});
```

## Configuration

The library supports various configuration options for both `runTsScript` and `execute` functions. These options allow you to customize the execution environment, working directory, and other parameters.

For detailed configuration options, please refer to the TypeScript types in the source code.
