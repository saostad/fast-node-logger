import * as path from "path";
import { deleteOldFiles, checkDirectory } from "./utils";
import pino from "pino";

export const defaultLogFolder = path.join("logs");

let logFileStream: pino.Logger | undefined;

export async function createLogger() {
  const fileName = `${new Date().getTime()}.log`;
  const filePath = path.join(defaultLogFolder, fileName);

  /** make sure logs folder exist */
  const logFolderExist = await checkDirectory(defaultLogFolder);
  if (!logFolderExist) {
    throw new Error("Logs Folder not Exist");
  }

  deleteOldFiles({ options: { keepMetaFiles: true, keepAliveTime: 60 } });

  console.log(`Logging to file: ${filePath}`);

  const dest = pino.destination(filePath);
  logFileStream = pino(dest);
}

/** get logs and if log file exist, write it to file and console.log it */
export function writeLog(message: any, config = { stdout: false }) {
  if (logFileStream) {
    logFileStream.info(message);

    if (config.stdout) {
      console.log(message);
    }
  } else {
    console.log(message);
  }
}
