import dotenv from "dotenv";
import { writeLog, createLogger } from "./lib/logger";
dotenv.config();

export async function main() {
  /** put your code below here */
  createLogger();
  writeLog(`logger is created!`, { stdout: true });
  console.log(`here is my secret: ${process.env.MY_SECRET}`);
  return process.env.MY_SECRET;
}

main();
