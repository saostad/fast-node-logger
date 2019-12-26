### A very fast logger and rotation to file based on [pino](https://www.npmjs.com/package/pino).

## Notice:

this is very opinionated package that limit the flexibility of awesome [pino](https://www.npmjs.com/package/pino) package. if you need full functionality please use original package.

## Quick Start

```
import { createLogger, writeLog } from "fast-node-logger";

createLogger().then(() => {
  writeLog("hi");
});
```
