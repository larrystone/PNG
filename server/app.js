import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import config from './config';

const app = express();

const { PORT = 3000 } = process.env;

config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/phoneNumbers', routes);

app.get('/', (req, res) => res.send('Welcome to nothing land!!!'));

app.get('*', (req, res) => res.status(404).json('Path not configured, consult the documentation'));

app.listen(PORT, () => console.log(`Magic happens on PORT: ${PORT}`));

export default app;
