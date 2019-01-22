import sendResponse from '../utils/sendResponse';
import generateNumbers from '../utils/generateNumbers';
import fs from '../utils/fs';

export default class {
  static async create({ query }, res) {
    const total = parseInt(query.n, 10) || 500;

    try {
      const numbers = generateNumbers(total);

      const filename = `batch_${new Date().getTime()}`;

      const { length } = numbers;

      const parsedResult = {
        batchId: filename,
        total: length,
        min: numbers[0],
        max: numbers[length - 1],
        createdAt: new Date(),
        numbers,
      };

      await fs.createFile(filename, parsedResult);

      return sendResponse(res, 201, {
        message: 'New phone numbers generated',
        ...parsedResult,
      });
    } catch ({ message }) {
      return sendResponse(res, 500, { error: message });
    }
  }

  static async getAll(req, res) {
    try {
      const files = await fs.readFiles();

      return sendResponse(res, 200, {
        message: 'Success',
        data: files,
      });
    } catch ({ message }) {
      return sendResponse(res, 500, { error: message });
    }
  }

  static async get({ params }, res) {
    const { batchId } = params;

    try {
      const data = await fs.readFile(batchId);

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
    const { batchId } = params;

    try {
      const data = await fs.deleteFile(batchId);

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
