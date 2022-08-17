### An opinionated file logger with limited rotation policy options, base on [pino](https://www.npmjs.com/package/pino).

this package provides:

- quick start with default configuration.
- an instance of [pino](https://www.npmjs.com/package/pino) logger.
- flexibility of pino with options and prettify the output.
- create log files in `logs` directory of root project directory.
- delete old log files.
- type safe with typescript.

## Notice:

This is an opinionated package that limit the flexibility of awesome [pino](https://www.npmjs.com/package/pino) package. if you need full functionality please use original package.

## Quick Start

```js
import { createLogger } from "fast-node-logger";

const logger = await createLogger();
logger.info(`Logger is Ready!`);
```

## VSCode extension

You can use the complimentary extension for VSCode [writelog-snippets](https://marketplace.visualstudio.com/items?itemName=saostad.writelog-snippets).

## Customization

```js
const options: Options = {
  logDir: "./my-logs",
  retentionTime: 604800, // for 7 days
};
await createLogger(options);
```

### Documentations

[Documentations website](https://saostad.github.io/fast-node-logger/)

### use pino original options [Pino Docs](https://github.com/pinojs/pino/blob/master/docs/api.md#options)

```js
import { createLogger, Options } from "fast-node-logger";

const options: Options = {
  level: "trace",
};

const logger = await createLogger(options);
```

### CreateLogger(options)

returns an instance of pino

```js
import { createLogger } from "fast-node-logger";

const logger = await createLogger();

logger.info(`Logger is Ready!`);
```

### writeLog(message, {stdout: false})

a shortcut for `logger.info(message)` with ability to additionally print to console with second parameter `{stdout: true}`

```js
import { writeLog, createLogger, Options } from "fast-node-logger";

await createLogger();

writeLog(`logger is created!`, { stdout: true, level: "trace" });
```

### TODO:

- [ ] add [recommended log rotation](https://github.com/pinojs/pino/blob/master/docs/help.md#log-rotation)
- [ ] add ability to integrate with cloud log services (e.g. [sentry](https://sentry.io))
