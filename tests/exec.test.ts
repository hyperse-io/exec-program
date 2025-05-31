import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runTsScript } from '@/runTsScript.js';

const getDirname = (url: string, ...paths: string[]) => {
  return join(dirname(fileURLToPath(url)), ...paths);
};

const cliPath = getDirname(import.meta.url, './cli-test.ts');

describe('test suites of exec program', () => {
  it('should correct invoke cli.ts', async () => {
    const { stderr, stdout } = await runTsScript(cliPath);
    expect(stderr).toBe('');
    expect(stdout).toMatch(/cli.../);
  });
});
