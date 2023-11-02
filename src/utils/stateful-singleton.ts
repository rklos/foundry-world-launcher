// the problem: https://stackoverflow.com/a/75273986
// solution source: https://github.com/vercel/next.js/discussions/15054#discussioncomment-658138
export class StatefulSingleton<T> {
  private readonly sym: symbol;

  constructor(uniqueName: string) {
    this.sym = Symbol.for(`__stateful-singleton_${uniqueName}`);
  }

  get value(): T | undefined {
    return (globalThis as any)[this.sym] as T | undefined;
  }

  set value(value: T) {
    (globalThis as any)[this.sym] = value;
  }
}
