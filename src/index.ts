import pino from "pino";
import path from "path";

import { deleteOldFiles, createDirectoryIfNotExist } from "./helpers/utils";
import { defaultLogFolder } from "./helpers/variables";

/** instance for logging to file */
let logFileStream: pino.Logger | undefined;

/**instance for log to console */
let logToConsole: pino.Logger | undefined;

const defaultRetentionTime = 604800 /** 7 days in seconds */;
const defaultLogLevel = "info";

export interface Options extends pino.LoggerOptions {
  /** location of log files */
  logDir?: string;
  /** number of seconds - default 604800 for 7 days */
  retentionTime?: number;
  /** prettify config for console output */
  prettyPrint?: pino.PrettyOptions;
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
      keepAliveTime: options?.retentionTime ?? defaultRetentionTime,
    },
  });

  const dest = pino.destination(filePath);

  logToConsole = pino({
    ...options,
  });

  logFileStream = pino(
    { ...options, prettyPrint: { colorize: false } } ?? {},
    dest,
  );

  logToConsole.info(`Logging to file: ${filePath}`);
  return logFileStream;
}

interface WriteLogOptions {
  stdout?: boolean;
  level?: pino.Level;
}

/** write message to both file and/or console */
export function writeLog(
  message: any,
  config: WriteLogOptions = { stdout: false, level: defaultLogLevel },
) {
  if (logFileStream) {
    logFileStream[config.level ?? defaultLogLevel](message);

    if (config.stdout) {
      logToConsole?.[config.level ?? defaultLogLevel](message);
    }
  } else {
    console.log(message);
  }
}
