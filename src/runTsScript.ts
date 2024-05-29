import type { Options } from 'execa';
import { execa } from 'execa';

/**
 * Process execute typescript script file using `@hyperse/ts-node-paths`
 * @param program - The absolute typescript file path
 * @param options - The configuration of `execa` { env: { TS_NODE_PATHS_PROJECT: tsconfig } }
 * @param args - The runtime argv for program
 */
export const runTsScript = <T extends Options>(
  program: string,
  options: T,
  ...args: string[]
) => {
  const moduleArgs = [
    '--import',
    '@hyperse/ts-node-paths/register',
    '--no-warnings',
  ];
  return execa('node', moduleArgs.concat(program, ...args), {
    ...options,
  });
};
