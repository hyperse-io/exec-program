import { execa, Options } from 'execa';

/**
 * Execute a file with arguments and options
 * @example
 * ```ts
 *  const { stdout, stderr } = await exec(
 *    'npm',
 *    ['i', '--no-save', '--no-package-lock', ...toInstall],
 *    {
 *      cwd: target.directory,
 *      maxBuffer: TEN_MEGA_BYTE,
 *      env: this.options.npmEnv,
 *    }
 *  );
 *  ```
 * @example
 * ```ts
 *  await exec('npm', ['pack', directory], {
 *    cwd: this.uniqueDir,
 *    maxBuffer: TEN_MEGA_BYTE,
 *  });
 * ```
 * @param file - The program/script to execute, as a string or file URL
 * @param args - Arguments to pass to `file` on execution.
 * @param options - Options to pass to `execa`
 * @returns A `ResultPromise` that is both:
 */
export function exec<T extends Options>(
  file: string,
  args?: readonly string[],
  options?: T
) {
  return execa(file, args, options);
}
