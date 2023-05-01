# Promise Constructor
Creating Promises in JavaScript.

## By syntactic sugar
Without `Promise` class.
Works even if `Promise` is `null`.

+ [TypeScript](./create-native-promise.ts)
+ [JavaScript](./create-native-promise.js)

```js
Promise = null;
globalThis.Promise = null;
const { promise, resolve, reject } = await createNativePromise();
```

## By async callback
Without typecasting.
Note that the callback will always be called asynchronously.

+ [TypeScript](./create-promise-callback.ts)
+ [JavaScript](./create-promise-callback.js)
```js
createPromiseByCallback((promise, resolve, reject) => {
});
```
