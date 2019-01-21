import express from 'express';
import phoneNumbers from './controllers/phoneNumbers';

const routes = express();

routes.route('/api/phoneNumbers')
  .post(phoneNumbers.create)
  .get(phoneNumbers.getAll);

routes.route('/api/phoneNumbers/:id')
  .get(phoneNumbers.get)
  .delete(phoneNumbers.delete);

export default routes;
