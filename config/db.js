import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const { URI_DB } = process.env;

mongoose.connect(URI_DB);
const db = mongoose.connection;

db.on('error', () =>  {
  console.log('Error de conexion a la base de datos')
});
db.once('open', () => {
  console.log('Connection a la base de datos exitosa');
});

export default db;