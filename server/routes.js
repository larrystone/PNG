import express from 'express';
import phoneNumbers from './controllers/phoneNumbers';

const routes = express();

routes.route('/')
  .post(phoneNumbers.create)
  .get(phoneNumbers.getAll);

routes.route('/:batchId')
  .get(phoneNumbers.get)
  .delete(phoneNumbers.delete);

export default routes;
