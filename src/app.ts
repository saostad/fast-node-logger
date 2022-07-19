// import { writeLog, createLogger } from "./index";

// createLogger().then((logger) => {
//   logger.info(`test`);
//   // writeLog(`test`, { level: "info", stdout: true });
// });
import pino from "pino";

const logger = pino();

logger.info("test");
