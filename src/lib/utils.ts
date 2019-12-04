import * as fs from "fs";
import rimraf from "rimraf";
import * as path from "path";
import { defaultLogFolder } from "./logger";

interface DeleteOldFileOptions {
  keepMetaFiles?: boolean;
  keepAliveTime?: number;
}

interface DeleteOldFilesFn {
  dirPath?: string;
  options?: DeleteOldFileOptions;
}

export const deleteOldFiles = ({ dirPath, options }: DeleteOldFilesFn) => {
  try {
    const pathToDelete = dirPath ? dirPath : defaultLogFolder;
    const keepAliveTime =
      options && options.keepAliveTime ? options.keepAliveTime : 180000;
    // eslint-disable-next-line no-console
    console.log(`deleting old files from folder: ${pathToDelete}`);
    fs.readdir(pathToDelete, (err1, files) => {
      if (!err1) {
        files.forEach(file => {
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
                rimraf(path.join(pathToDelete, file), () => {});
              }
            }
          });
        });
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
