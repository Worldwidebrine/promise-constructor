type ThenableThen<T> = Promise<T>["then"];
type ThenableThenParameters<T> = Parameters<ThenableThen<T>>;
type BroadcastFulfillment<T> = ThenableThenParameters<T>[0];
type BroadcastRejection = ThenableThenParameters<never>[1];

class ResolvedThenable implements PromiseLike<void> {
    then = <ThenableThen<void>>((broadcastFulfillment: () => void) => {
        broadcastFulfillment();
    })
}

export const createNativePromise = async <T>(): Promise<{
    promise: Promise<T>;
    resolve: NonNullable<BroadcastFulfillment<T>>;
    reject: NonNullable<BroadcastRejection>
}> => {
    let res: BroadcastFulfillment<T> = null;
    let rej: BroadcastRejection = null;
    const promise = (async () => ({
        then: (broadcastFulfillment, broadcastRejection) => {
            res = broadcastFulfillment;
            rej = broadcastRejection
        }
    } as PromiseLike<T>))();
    await new ResolvedThenable; // await another thenable object to make sure the promise has been constructed
    return {
        promise,
        resolve: res as unknown as NonNullable<BroadcastFulfillment<T>>,
        reject: rej as unknown as NonNullable<BroadcastRejection>
    };
};
