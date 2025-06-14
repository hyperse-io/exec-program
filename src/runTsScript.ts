import { execa } from 'execa';
import type { ExecOptions, ExecResultPromise } from './types.js';

/**
 * Process execute typescript script file using `@hyperse/ts-node`
 * @param program - The absolute typescript file path
 * @param options - The configuration of `execa` { env: { HPS_TS_NODE_PROJECT: tsconfig } }
 * @param args - The runtime argv for program
 */
export const runTsScript = <T extends ExecOptions>(
  program: string,
  args?: readonly string[],
  options?: T
): ExecResultPromise<{} & T> => {
  const moduleArgs = ['--import', '@hyperse/ts-node/register', '--no-warnings'];
  return execa('node', moduleArgs.concat(program, ...(args || [])), options);
};
