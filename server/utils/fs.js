import fs from 'fs';
import util from 'util';
import path from 'path';

fs.open = util.promisify(fs.open);
fs.readFile = util.promisify(fs.readFile);
fs.writeFile = util.promisify(fs.writeFile);
fs.readdir = util.promisify(fs.readdir);
fs.unlink = util.promisify(fs.unlink);
fs.close = util.promisify(fs.close);

const baseDir = path.join(__dirname, '../.data');

export const createFile = async (data) => {
  const filename = new Date().getTime();

  try {
    const fileDesc = await fs.open(`${baseDir}/batch_${filename}`, 'wx');

    const stringData = JSON.stringify(data);
    await fs.writeFile(fileDesc, stringData);
    await fs.close(fileDesc);
  } catch ({ message }) {
    throw new Error(message);
  }
};

export const readFile = async (filename) => {
  try {
    const file = await fs.readFile(`${baseDir}/${filename}`);

    return file;
  } catch ({ errno, message }) {
    if (errno === -2) return false;
    throw new Error(message);
  }
};

export const readFiles = async () => {
  try {
    const files = await fs.readdir(baseDir);

    return files;
  } catch (error) {
    throw new Error(error);
  }
};


export const deleteFile = async (filename) => {
  try {
    await fs.unlink(`${baseDir}/${filename}`);
    return 'OK';
  } catch ({ errno, message }) {
    if (errno === -2) return false;
    throw new Error(message);
  }
};
