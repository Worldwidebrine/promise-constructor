const resolved = Promise.resolve();
export function createPromiseByCallback(passResult) {
    const promise = new Promise((...args) => {
        resolved.then(() => passResult(promise, ...args)); // queueMicrotask to make sure promise has been initialized
    });
}
