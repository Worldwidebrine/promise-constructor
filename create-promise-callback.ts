type ThenableThenParameters<T> = Parameters<Promise<T>["then"]>;
type BroadcastFulfillment<T> = ThenableThenParameters<T>[0];
type BroadcastRejection = ThenableThenParameters<never>[1];

var resolved = Promise.resolve();

export function createPromiseAsync<T>(passResult: (promise: Promise<T>, ...args: ThenableThenParameters<T>) => void) {
    var promise = new Promise<T>(function (...args) {
        resolved.then(() => passResult(promise, ...args)) // queueMicrotask to make sure promise has been initialized
    });
};

export function createPromiseSync<T>(passResult: (promise: Promise<T>, ...args: ThenableThenParameters<T>) => void) {
    var arg: null | ThenableThenParameters<T> = null;
    var promise = new Promise<T>(function (...args) {
        arg = args
    });
    passResult(promise, ...<ThenableThenParameters<T>><unknown>arg)
};

export function createPromisePromised<T>() {
    return new Promise<{
        promise: Promise<T>;
        resolve: NonNullable<BroadcastFulfillment<T>>;
        reject: NonNullable<BroadcastRejection>
    }>(function (resolve) {
        var promise = new Promise<T>(function (broadcastFulfillment, broadcastRejection) {
            resolve(resolved.then(function () { // queueMicrotask to make sure promise has been initialized
                return {
                    promise,
                    resolve: broadcastFulfillment,
                    reject: broadcastRejection
                };
            }))
        })
    })
};

export function createPromise<T>() {
    var res: BroadcastFulfillment<T> = null;
    var rej: BroadcastRejection = null;
    var promise = new Promise<T>(function (broadcastFulfillment, broadcastRejection) {
        res = broadcastFulfillment;
        rej = broadcastRejection
    });
    return {
        promise,
        resolve: res as unknown as NonNullable<BroadcastFulfillment<T>>,
        reject: rej as unknown as NonNullable<BroadcastRejection>
    };
};
