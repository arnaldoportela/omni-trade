export type Constructor<T = unknown> = new (...args: any[]) => T;
export type AbstractConstructor<T = unknown> = abstract new (...args: any[]) => T;