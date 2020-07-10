### A very opinionated file logger and rotation, base on [pino](https://www.npmjs.com/package/pino).

this package provides:

- quick start with default configuration
- an instance of [pino](https://www.npmjs.com/package/pino) logger
- most flexibility of pino with options and prettify the output
- create a new file in `logs` folder of root directory.
- delete old log files
- type safe with typescript

## Notice:

this is very opinionated package that limit the flexibility of awesome [pino](https://www.npmjs.com/package/pino) package. if you need full functionality please use original package.

## Quick Start

```js
import { createLogger } from "fast-node-logger";

const logger = await createLogger();
logger.info(`Logger is Ready!`);
```

## Customization

```js
const options: Options = {
  logDir: "./logs",
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
  prettyPrint: { colorize: true, translateTime: "SYS:standard" },
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
