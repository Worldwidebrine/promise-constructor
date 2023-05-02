# Promise Constructor

Creating Promises in TypeScript.

## By syntactic sugar

Without `Promise` class.
Works even if `Promise` is `null`.

+ [TypeScript](./create-native-promise.ts)
+ [JavaScript](./create-native-promise.js)

### Async

```js
Promise = null;
globalThis.Promise = null;
const { promise, resolve, reject } = await createNativePromise();
```

### Sync

Contains `as unknown as`.

```js
Promise = null;
globalThis.Promise = null;
const { promise, resolve, reject } = createNativePromiseSync();
```

## By Promise class/constructor

+ [TypeScript](./create-promise-callback.ts)
+ [JavaScript](./create-promise-callback.js)

### Async callback

No `as unknown as`.
Note that the callback will always be called asynchronously.

```js
createPromiseAsync((promise, resolve, reject) => {
});
```

### Sync callback

Contains `as unknown as`.
JS dist can't pass `//@ts-check`.

Note that the callback will always be called synchronously.

```js
createPromiseSync((promise, resolve, reject) => {
});
```

### Promised

No `as unknown as`.
Nested promise.

```js
createPromisePromised().then(({ promise, resolve, reject }) => {
});
```

### Typecasting

The classic way using `as unknown as`.
JS dist can't pass `//@ts-check`.

```js
var { promise, resolve, reject } = createPromise();
```
