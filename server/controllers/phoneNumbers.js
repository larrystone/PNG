import sendResponse from '../utils/sendResponse';
import generateNumbers from '../utils/generateNumbers';
import {
  createFile, readFile, readFiles, deleteFile,
} from '../utils/fs';

export default class {
  static async create({ body }, res) {
    const { total = 20 } = body;

    try {
      const numbers = generateNumbers(total);

      const { length } = numbers;

      const parsedResult = {
        total: length,
        min: numbers[0],
        max: numbers[length - 1],
        createdAt: new Date(),
        numbers,
      };

      await createFile(parsedResult);

      return sendResponse(res, 201, {
        message: 'New Numbers generated',
        ...parsedResult,
      });
    } catch ({ message }) {
      return sendResponse(res, 500, { error: message });
    }
  }

  static async getAll(req, res) {
    try {
      const files = await readFiles();

      return sendResponse(res, 200, {
        message: 'Success',
        data: files,
      });
    } catch ({ message }) {
      return sendResponse(res, 500, { error: message });
    }
  }

  static async get({ params }, res) {
    const { id } = params;

    try {
      const data = await readFile(id);

      if (!data) {
        return sendResponse(res, 404, {
          error: 'Batch not found',
        });
      }

      return sendResponse(res, 200, { message: 'Numbers batch found', ...JSON.parse(data) });
    } catch ({ message }) {
      return sendResponse(res, 500, { error: message });
    }
  }

  static async delete({ params }, res) {
    const { id } = params;

    try {
      const data = await deleteFile(id);

      if (!data) {
        return sendResponse(res, 404, {
          error: 'Batch not found',
        });
      }

      return sendResponse(res, 200);
    } catch ({ message }) {
      return sendResponse(res, 500, { error: message });
    }
  }
}
