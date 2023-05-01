type ThenableThenParameters<T> = Parameters<Promise<T>["then"]>;

const resolved = Promise.resolve();

export function createPromiseByCallback<T>(passResult: (promise: Promise<T>, ...args: ThenableThenParameters<T>) => void) {
    const promise = new Promise<T>((...args) => {
        resolved.then(() => passResult(promise, ...args)); // queueMicrotask to make sure promise has been initialized
    });
}
