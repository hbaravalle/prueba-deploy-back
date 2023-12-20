require("dotenv").config();
const cors = require("cors");
const express = require("express");
const routes = require("./routes");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

app.use(cors()); // Para habilitar esta línea es necesario instalar la librería `cors`.
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => res.json("Te damos la bienvenida"));
routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
