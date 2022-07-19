import { writeLog, createLogger } from "./index";

createLogger({ level: "trace" }).then((logger) => {
  logger.info(`test1`);
  writeLog(`test2`, { level: "warn", stdout: true });
});
// import pino from "pino";

// const logger = pino();

// logger.info("test");
