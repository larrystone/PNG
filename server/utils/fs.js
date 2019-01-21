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

export default class {
  static async createFile(filename, data) {
    try {
      const fileDesc = await fs.open(`${baseDir}/${filename}`, 'wx');

      const stringData = JSON.stringify(data);
      await fs.writeFile(fileDesc, stringData);
      return await fs.close(fileDesc);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async readFile(filename) {
    try {
      const file = await fs.readFile(`${baseDir}/${filename}`);

      return file;
    } catch ({ errno, message }) {
      if (errno === -2) return false;
      throw new Error(message);
    }
  }

  static async readFiles() {
    try {
      const files = await fs.readdir(baseDir);

      return files.map(file => ({ id: file }));
    } catch (error) {
      throw new Error(error);
    }
  }


  static async deleteFile(filename) {
    try {
      await fs.unlink(`${baseDir}/${filename}`);
      return 'OK';
    } catch (error) {
      if (error.errno === -2) return false;
      throw new Error(error.message);
    }
  }
}
