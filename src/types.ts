import type { Options, ResultPromise } from 'execa';

export type ExecOptions = Options;
export type ExecResultPromise<T extends Options = Options> = ResultPromise<T>;
