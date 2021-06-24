require("dotenv").config();
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
app.use(express.json());
app.use(cors());

const educador = require("./educador");
const familiar = require("./familiar");
app.use("/educador", educador);
app.use("/familiar", familiar);

//Conexion a la DB

let db;

MongoClient.connect(
  process.env.URL_CONNECTION_BBDD,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err !== null) {
      console.log("A habido un error: " + err);
    } else {
      app.locals.db = client.db("guarderia");
      db = client.db("guarderia");
    }
  }
);

app.listen(3001, console.log("Servidor iniciado en el puerto 3001"));
