export const createNativePromise = async () => {
    return await {
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
    };
};
