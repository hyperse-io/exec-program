import { execa } from 'execa';
import type { ExecOptions, ExecResultPromise } from './types.js';

/**
 * Process execute typescript script file using `@hyperse/ts-node-paths`
 * @param program - The absolute typescript file path
 * @param options - The configuration of `execa` { env: { TS_NODE_PATHS_PROJECT: tsconfig } }
 * @param args - The runtime argv for program
 */
export const runTsScript = <T extends ExecOptions>(
  program: string,
  args?: readonly string[],
  options?: T
): ExecResultPromise<{} & T> => {
  const moduleArgs = [
    '--import',
    '@swc-node/register/esm-register',
    '--no-warnings',
  ];
  return execa('node', moduleArgs.concat(program, ...(args || [])), options);
};
