const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
//opciones del servidor mongodb
const options = {
  useNewUrlParser: true,
  autoIndex: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
};
//Activar Variable de entorno .env
dotenv.config();

//importar rutas
const clienteRoutes = require("./src/routes/clienteRoutes.js");
const usuarioRoutes = require("./src/routes/usuarioRoutes.js")
const app = express();
const port = process.env.API_PORT;
//Activar cors para permitir conexiones en otros dispositivos
app.use(cors());
app.options("*", cors());
//Activar body-parser para permitir envios y respuestas en formato json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Habilitar rutas con express
app.use("/api", clienteRoutes);
app.use("/api", usuarioRoutes);
//Realizar Conexión a mongodb
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_name = process.env.DB_NAME;
mongoose
  .connect(`mongodb://${db_host}:${db_port}/${db_name}`, options)
  .then(() => console.log("Conexion exitosa a la base de datos"))
  .catch((err) =>
    console.log("Ocurrió un problema al conectarse a la base de datos")
  );
//Verificar si el puerto está activado para servir información
app.listen(port, () => {
  console.log(`Servidor conectado a http://${db_host}:${port}`);
});
module.exports = app;
