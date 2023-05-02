type ThenableThen<T> = Promise<T>["then"];
type ThenableThenParameters<T> = Parameters<ThenableThen<T>>;
type BroadcastFulfillment<T> = ThenableThenParameters<T>[0];
type BroadcastRejection = ThenableThenParameters<never>[1];

export const createNativePromise = async<T>() => (await ({
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
}>));

export const createNativePromiseSync = <T>() => {
  let res = null;
  let rej = null;
  const promise = (async () => ({
    then: (broadcastFulfillment, broadcastRejection) => {
      res = broadcastFulfillment;
      rej = broadcastRejection
    }
  } as PromiseLike<T>))();
  return {
    promise,
    resolve: res,
    reject: rej
  } as unknown as {
    promise: Promise<T>;
    resolve: NonNullable<BroadcastFulfillment<T>>;
    reject: NonNullable<BroadcastRejection>
  };
};
