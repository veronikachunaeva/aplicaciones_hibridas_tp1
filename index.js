import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import routerApi from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
dotenv.config();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/', express.static('./public'));

app.get("/", (request, response) => {
  // response.send("<h1>API LINK NOTE</h1>");
  response.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const { PORT, URI_DB } = process.env;

app.listen(PORT, (request, response) => {
  console.log('Servidor corriendo en el puerto', PORT);
});
routerApi(app);

mongoose.connect(URI_DB);
const db = mongoose.connection;
db.on('error', () =>  {
  console.log('Error de conexion a la base de datos')
});
db.once('open', () => {
  console.log('Connection a la base de datos exitosa');
});
