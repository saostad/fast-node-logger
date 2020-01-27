import * as path from "path";
import { deleteOldFiles, createDirectoryIfNotExist } from "./helpers/utils";
import pino from "pino";
import { defaultLogFolder } from "./helpers/variables";

let logFileStream: pino.Logger | undefined;

export interface Options {
  logDir?: string;
  retentionTime?: number;
}

/** @returns a previously instantiated instance of Pino that logs to an automatically generated file in logs folder in root directory */
export async function createLogger(options?: Options): Promise<pino.Logger> {
  const fileName = `${new Date().getTime()}.log`;
  const dirPath = options?.logDir ?? defaultLogFolder;
  const filePath = path.join(dirPath, fileName);

  /** make sure logs folder exist */
  await createDirectoryIfNotExist(dirPath).catch(function() {
    throw new Error("Logs Folder not Exist");
  });

  deleteOldFiles({
    dirPath,
    options: {
      keepMetaFiles: true,
      keepAliveTime: options?.retentionTime ?? 604800 /** 7 days in seconds */,
    },
  });

  console.log(`Logging to file: ${filePath}`);

  const dest = pino.destination(filePath);

  logFileStream = pino(dest);

  return logFileStream;
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
