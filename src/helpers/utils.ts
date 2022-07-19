import * as fs from "fs";
import rimraf from "rimraf";
import * as path from "path";
import { promisify } from "util";
import { defaultLogFolder } from "./variables";

export async function createDirectoryIfNotExist(
  directory: string,
): Promise<boolean> {
  const mkdir = promisify(fs.mkdir);
  const stat = promisify(fs.stat);

  await stat(directory).catch(async (err) => {
    if (err && err.errno === -4058) {
      //Create the directory, call the callback.
      await mkdir(directory, { recursive: true });
      return true;
    } else {
      //just in case there was a different error:
      console.log(err);
      return false;
    }
  });
  return true;
}

interface DeleteOldFileOptions {
  keepMetaFiles?: boolean;
  /**Number of Seconds */
  keepAliveTime?: number;
}

interface DeleteOldFilesFn {
  dirPath?: string;
  options?: DeleteOldFileOptions;
}

export const deleteOldFiles = ({ dirPath, options }: DeleteOldFilesFn) => {
  try {
    const pathToDelete = dirPath ?? defaultLogFolder;

    const keepAliveTime = options?.keepAliveTime ?? 180000;

    console.log(`deleting old files from folder: ${pathToDelete}`);
    fs.readdir(pathToDelete, (err1, files) => {
      if (!err1) {
        files.forEach((file) => {
          if (
            (options && options.keepMetaFiles && file === ".empty") ||
            file === ".Readme.md" ||
            file === ".README"
          ) {
            return;
          }
          fs.stat(path.join(pathToDelete, file), (err2, stat) => {
            if (!err2) {
              const now = new Date().getTime();
              const endTime = new Date(stat.ctime).getTime() + keepAliveTime;

              if (now > endTime) {
                rimraf(path.join(pathToDelete, file), () => {
                  null;
                });
              }
            }
          });
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
};
