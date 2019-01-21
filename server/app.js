import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Welcome to nothing land!!!'));

app.get('*', (req, res) => res.status(404).json('Path not configured, consult the documentation'));

app.listen(PORT, () => console.log(`Magic happens on PORT: ${PORT}`));
