class ResolvedThenable {
    then = ((broadcastFulfillment) => {
        broadcastFulfillment();
    });
}
export const createNativePromise = async () => {
    let res = null;
    let rej = null;
    const promise = (async () => ({
        then: (broadcastFulfillment, broadcastRejection) => {
            res = broadcastFulfillment;
            rej = broadcastRejection;
        }
    }))();
    await new ResolvedThenable; // await another thenable object to make sure the promise has been constructed
    return {
        promise,
        resolve: res,
        reject: rej
    };
};
