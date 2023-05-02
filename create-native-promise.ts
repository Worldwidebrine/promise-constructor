type ThenableThen<T> = Promise<T>["then"];
type ThenableThenParameters<T> = Parameters<ThenableThen<T>>;
type BroadcastFulfillment<T> = ThenableThenParameters<T>[0];
type BroadcastRejection = ThenableThenParameters<never>[1];

export const createNativePromise = async<T>() => {
    return await ({
        then: (resolve) => {
            const promise = (async () => ({
                then: async (broadcastFulfillment, broadcastRejection) => {
                    await null;
                    (<(value: any) => void>resolve)({
                        promise,
                        resolve: broadcastFulfillment,
                        reject: broadcastRejection
                    })
                }
            } as PromiseLike<T>))()
        }
    } as PromiseLike<{
        promise: Promise<T>;
        resolve: NonNullable<BroadcastFulfillment<T>>;
        reject: NonNullable<BroadcastRejection>
    }>);
};
