import fs from 'fs';
import util from 'util';
import path from 'path';

const open = util.promisify(fs.open);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);
const close = util.promisify(fs.close);

const baseDir = path.join(__dirname, '../.data');

export default class {
  static async createFile(filename, data) {
    try {
      const fileDesc = await open(`${baseDir}/${filename}`, 'wx');

      const stringData = JSON.stringify(data);
      await writeFile(fileDesc, stringData);
      return await close(fileDesc);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async readFile(filename) {
    try {
      const file = await readFile(`${baseDir}/${filename}`);

      return file;
    } catch ({ errno, message }) {
      if (errno === -2) return false;
      throw new Error(message);
    }
  }

  static async readFiles() {
    try {
      const files = await readdir(baseDir);

      return files.map(file => ({ id: file }));
    } catch (error) {
      throw new Error(error);
    }
  }


  static async deleteFile(filename) {
    try {
      await unlink(`${baseDir}/${filename}`);
      return 'OK';
    } catch (error) {
      if (error.errno === -2) return false;
      throw new Error(error.message);
    }
  }
}
