# Promise Constructor

Creating Promises in TypeScript.

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

## By Promise class/constructor

+ [TypeScript](./create-promise-callback.ts)
+ [JavaScript](./create-promise-callback.js)

### Async callback

No typecasting.
Note that the callback will always be called asynchronously.

```js
createPromiseAsync((promise, resolve, reject) => {
});
```

### Sync callback

Contains typecasting.
JS dist can't pass `//@ts-check`.

Note that the callback will always be called synchronously.

```js
createPromiseSync((promise, resolve, reject) => {
});
```

### Promised

No typecasting.
Nested promise.

```js
createPromisePromised().then(({ promise, resolve, reject }) => {
});
```

### Typecasting

The classic way typecasting.
JS dist can't pass `//@ts-check`.

```js
var { promise, resolve, reject } = createPromise();
```
