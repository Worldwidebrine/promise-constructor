var resolved = Promise.resolve();
export function createPromiseAsync(passResult) {
  var promise = new Promise(function (...args) {
    resolved.then(() => passResult(promise, ...args)); // queueMicrotask to make sure promise has been initialized
  });
};
export function createPromiseSync(passResult) {
  var arg = null;
  var promise = new Promise(function (...args) {
    arg = args;
  });
  passResult(promise, ...arg);
};
export function createPromisePromised() {
  return new Promise(function (resolve) {
    var promise = new Promise(function (broadcastFulfillment, broadcastRejection) {
      resolve(resolved.then(function () {
        return {
          promise,
          resolve: broadcastFulfillment,
          reject: broadcastRejection
        };
      }));
    });
  });
};
export function createPromise() {
  var res = null;
  var rej = null;
  var promise = new Promise(function (broadcastFulfillment, broadcastRejection) {
    res = broadcastFulfillment;
    rej = broadcastRejection;
  });
  return {
    promise,
    resolve: res,
    reject: rej
  };
};
