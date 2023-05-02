export const createNativePromise = async () => (await {
  then: (resolve) => {
    const promise = (async () => ({
      then: async (broadcastFulfillment, broadcastRejection) => {
        await null;
        resolve({
          promise,
          resolve: broadcastFulfillment,
          reject: broadcastRejection
        });
      }
    }))();
  }
});
export const createNativePromiseSync = () => {
  let res = null;
  let rej = null;
  const promise = (async () => ({
    then: (broadcastFulfillment, broadcastRejection) => {
      res = broadcastFulfillment;
      rej = broadcastRejection;
    }
  }))();
  return {
    promise,
    resolve: res,
    reject: rej
  };
};
