import { execute } from '../src/execute.js';

describe('execute', () => {
  it('should execute a command with arguments and options', async () => {
    const { stdout } = await execute('echo', ['hello']);
    expect(stdout).toBe('hello');
  });

  it('should throw on invalid command', async () => {
    await expect(execute('invalid-command')).rejects.toThrow();
  });

  it('should handle command with no arguments', async () => {
    const result = await execute('node', ['--version']);
    expect(result.stdout).toMatch(/v\d+\.\d+\.\d+/);
  });
});
