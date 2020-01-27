### A very opinionated file logger and rotation, base on [pino](https://www.npmjs.com/package/pino).

this package does:

- create an instance of [pino](https://www.npmjs.com/package/pino) logger
- create a new file in `logs` folder of root directory.
- delete old log files

## Notice:

this is very opinionated package that limit the flexibility of awesome [pino](https://www.npmjs.com/package/pino) package. if you need full functionality please use original package.

## Quick Start

```js
import { createLogger, writeLog } from "fast-node-logger";

createLogger().then(() => {
  writeLog("hi");
});
```

## Customization

```js
const options: Options = {
  logDir: "./logs",
  retentionTime: 604800, // for 7 days
};
await createLogger(options);
```

### CreateLogger(options)

returns an instance of pino

```js
const logger = await createLogger();
logger.info(`Logger is Ready!`);
```

### writeLog(message, {stdout: false})

a shortcut for `logger.info(message)` with ability to additionally `console.log(message)` with second parameter `{stdout: true}`

## TODO:

- add pino options in createLogger options for more flexibility
