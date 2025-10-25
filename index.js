import express from 'express';
import routerApi from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from "dotenv";
import db from "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/', express.static('./public'));

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

dotenv.config();
const { PORT } = process.env;

app.listen(PORT, (request, response) => {
  console.log('Servidor corriendo en el puerto', PORT);
});
routerApi(app);



