/** How to use it:  */
import dotenv from "dotenv";
import { writeLog, createLogger, Options } from "./";
dotenv.config();

export async function main() {
  const options: Options = {
    level: "trace",
    prettyPrint: { colorize: true, translateTime: "SYS:standard" },
  };
  const logger = await createLogger(options);
  writeLog(`logger is created!`, { stdout: true });
  logger.debug("debug log");
  logger.info(`here is my secret: ${process.env.MY_SECRET}`);
  return process.env.MY_SECRET;
}

main();
