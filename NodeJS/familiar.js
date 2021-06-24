const express = require("express");
const router = express.Router();

router.get("/infoAlumno", (req, res) => {
  const db = req.app.locals.db;
  const usuario = req.query.usuario;

  db.collection("alumnos")
    .find({ email: usuario })
    .toArray((error, info) => {
      if (error !== null) {
        console.log("A ocurrido un error: " + error);
      } else {
        res.send(info);
      }
    });
});

module.exports = router;
