import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import path from 'path';
import fs from 'fs';
import util from 'util';
import app from '../app';

const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);
chai.use(chaiHttp);

const baseUrl = '/api/phoneNumbers';

const dataLocation = path.join(__dirname, '../.data');

let batchId;

describe('phoneNumbers Controller test', () => {
  before(async () => {
    try {
      const files = await readdir(dataLocation);
      const filesToDelete = files.map(file => unlink(`${dataLocation}/${file}`));

      await Promise.all(filesToDelete)
    } catch (error) {
      console.log('Unable to clear data folder');
    }
  });

  describe('/POST', () => {
    it('create a new phone Number batch of 50 phone Numbers', async () => {
      const res = await chai.request(app)
        .post(`${baseUrl}?n=50`)
        .set('Accept', 'application/json');

      batchId = res.body.batchId;
      expect(res.statusCode).to.equal(201);
      expect(res.body.message).to.equal('New phone numbers generated');
      expect(res.body.total).to.equal(50);
      expect(res.body.min).to.exist;
      expect(res.body.max).to.exist;
    });

    it('create a default list of 500 numbers when size is not provided', async () => {
      const res = await chai.request(app)
        .post(baseUrl)
        .set('Accept', 'application/json');

      expect(res.statusCode).to.equal(201);
      expect(res.body.message).to.equal('New phone numbers generated');
      expect(res.body.total).to.equal(500);
      expect(res.body.min).to.exist;
      expect(res.body.max).to.exist;
    });

    it('create a default list of 500 numbers when invalid size is provided', async () => {
      const res = await chai.request(app)
        .post(`${baseUrl}?n=aaasas`)
        .set('Accept', 'application/json');

      expect(res.statusCode).to.equal(201);
      expect(res.body.message).to.equal('New phone numbers generated');
      expect(res.body.total).to.equal(500);
      expect(res.body.min).to.exist;
      expect(res.body.max).to.exist;
    });
  });

  describe('/GET', () => {
    it('return a list of number batches', async () => {
      const res = await chai.request(app).get(baseUrl);

      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data.length).to.equal(3);
    });

    it('return the numbers in a batch file', async () => {
      const res = await chai.request(app).get(`${baseUrl}/${batchId}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body.numbers).to.be.an('array');
      expect(res.body.createdAt).to.exist;
      expect(res.body.message).to.equal('Numbers batch found');
    });

    it('return an error for an invalid id - 404', async () => {
      const res = await chai.request(app).get(`${baseUrl}/201212dsdsdss`);

      expect(res.statusCode).to.equal(404);
      expect(res.body.error).to.equal('Batch not found');
    });
  });

  describe('/DELETE', () => {
    it('delete a number batch', async () => {
      const res = await chai.request(app).delete(`${baseUrl}/${batchId}`);

      expect(res.statusCode).to.equal(200);
    });

    it('return an error for an invalid id - 404', async () => {
      const res = await chai.request(app).get(`${baseUrl}/${batchId}`);

      expect(res.statusCode).to.equal(404);
      expect(res.body.error).to.equal('Batch not found');
    });
  });
});
