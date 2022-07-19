import pino from "pino";
import path from "path";

import { deleteOldFiles, createDirectoryIfNotExist } from "./helpers/utils";
import { defaultLogFolder } from "./helpers/variables";

export type Logger = pino.Logger;

/** instance for logging to file */
export let logToFile: Logger | undefined;

/**instance for log to console */
let logToConsole: Logger | undefined;

const defaultRetentionTime = 604800000; /** 7 days in milliseconds */
const defaultLogLevel = "info";

export interface Options extends pino.LoggerOptions {
  /** location of log files */
  logDir?: string;
  /** number of milliseconds - default 604800000 for 7 days */
  retentionTime?: number;
  /** prettify config for console output */
  prettyPrint?: pino.PrettyOptions;
}

/** @returns a previously instantiated instance of Pino that logs to an automatically generated file in logs folder in root directory */
export async function createLogger(options?: Options): Promise<Logger> {
  const fileName = `${new Date().getTime()}.log`;
  const dirPath = options?.logDir ?? defaultLogFolder;
  const filePath = path.join(dirPath, fileName);

  /** make sure logs folder exist */
  await createDirectoryIfNotExist(dirPath).catch(function () {
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

  dest.on("ready", () => {
    console.log(`File: index.ts,`, `Line: 49 => `, `sonic is ready`);

    logToFile = pino(
      { ...options, prettyPrint: { colorize: false } } ?? {},
      dest,
    );
    logToConsole = pino({
      ...options,
    });

    logToConsole.info(`Logging to file: ${filePath}`);
  });

  if (logToFile) {
    return logToFile;
  }
  throw new Error("fffff");
}

interface WriteLogOptions {
  stdout?: boolean;
  level?: pino.Level;
}

/** write message to both file and/or console */
export function writeLog(
  message: any,
  config: WriteLogOptions = { stdout: false, level: defaultLogLevel },
): void {
  try {
    if (logToFile) {
      logToFile[config.level ?? defaultLogLevel](message);

      if (config.stdout) {
        logToConsole?.[config.level ?? defaultLogLevel](message);
      }
    } else {
      /** fallback to console.log
       * if:
       *   - config provided
       *   - && log level is "info" || "fatal" || "warn" || "error"
       * else: do nothing
       */
      if (
        config &&
        config?.level === ("info" || "fatal" || "warn" || "error")
      ) {
        console.log(message);
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
