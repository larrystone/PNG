import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import config from './config';

const app = express();

const { PORT = 3000 } = process.env;

config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/phoneNumbers', routes);

if (process.env.NODE_ENV === 'production') {
  app.get('*.js', (req, res, next) => {
    req.url = `${req.url}.gz`;
    res.set('Content-Encoding', 'gzip');
    next();
  });
}

app.use('/', express.static('build'));
app.use('*', express.static('build'));

app.listen(PORT, () => console.log(`Magic happens on PORT: ${PORT}`));

export default app;
