/** How to use it:  */
import dotenv from "dotenv";
import { writeLog, createLogger, Options } from "./";
dotenv.config();

export async function main() {
  const options: Options = {
    logDir: "./logs",
    retentionTime: 30000,
  };
  await createLogger(options);
  writeLog(`logger is created!`, { stdout: true });
  console.log(`here is my secret: ${process.env.MY_SECRET}`);
  return process.env.MY_SECRET;
}

main();
