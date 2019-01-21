import fs from 'fs';
import path from 'path';
import util from 'util';

fs.mkdir = util.promisify(fs.mkdir);

const baseDir = path.join(__dirname, '../.data');

export default async () => {
  try {
    fs.access(baseDir, fs.constants.F_OK, async (err) => {
      if (err) {
        await fs.mkdir(baseDir);
      }
    });
  } catch ({ message }) {
    console.log('Could not create data folder: ', message);
  }
};
