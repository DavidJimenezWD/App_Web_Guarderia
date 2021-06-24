const express = require("express");
const router = express.Router();
const ObjectID = require("mongodb").ObjectID;

//---------AÑADIR EVENTOS-------------------------

router.post("/anyadirEvento", (req, resp) => {
  const db = req.app.locals.db;
  const evento = req.body;

  db.collection("event").insertOne(evento, (error, info) => {
    if (error !== null) {
      console.log("A ocurrido un error añadiendo el evento: " + error);
    } else {
      resp.send(info);
    }
  });
});

//------------OBTENER EVENTOS------------------

router.get("/eventos", (req, res) => {
  const db = req.app.locals.db;
  db.collection("event")
    .find()
    .toArray((error, dat) => {
      if (error !== null) {
        console.log("A ocurrido un error " + error);
      } else {
        res.send(dat);
      }
    });
});

//------------OBTENER EVENTOS PARA EDITAR------------------

router.get("/eventoID", (req, res) => {
  const db = req.app.locals.db;
  const idEvento = ObjectID(req.query.evento);
  db.collection("event")
    .find({ _id: idEvento })
    .toArray((error, dat) => {
      if (error !== null) {
        console.log("A ocurrido un error " + error);
      } else {
        res.send(dat);
      }
    });
});

//--------EDITAR EVENTOS---------------------------

router.put("/eventoEditar", (req, res) => {
  const db = req.app.locals.db;
  const idEvento = ObjectID(req.body.idEvento);
  const tituloEvento = req.body.tituloEvento;
  const textoEvento = req.body.textoEvento;
  const urlMedia = req.body.urlMedia;
  const fechaEvento = req.body.fechaEvento;

  db.collection("event").updateOne(
    { _id: idEvento },
    {
      $set: {
        tituloEvento,
        textoEvento,
        urlMedia,
        fechaEvento,
      },
    },
    (error, info) => {
      if (error !== null) {
        console.log("A ocurrido un error " + error);
      } else {
        res.send(info);
      }
    }
  );
});

//-----ELIMINAR EVENTOS---------------------------------

router.delete("/eliminarEvento", (req, res) => {
  const db = req.app.locals.db;
  const idEvento = ObjectID(req.query.evento);
  console.log(idEvento);
  db.collection("event").deleteOne({ _id: idEvento }, (error, info) => {
    if (error !== null) {
      console.log(error);
    } else {
      res.send(info);
    }
  });
});

router.delete("/eliminarEventoID", (req, res) => {
  const db = req.app.locals.db;
  const id = ObjectID(req.query.id);
  console.log(id);
  db.collection("event").deleteOne({ _id: id }, (error, info) => {
    if (error !== null) {
      console.log(error);
    } else {
      res.send(info);
    }
  });
});

//---------AÑADIR ALUMNOS----------------------

router.post("/anyadirAlumno", (req, res) => {
  const db = req.app.locals.db;
  const alumno = req.body;

  db.collection("alumnos").insertOne(alumno, (error, info) => {
    if (error !== null) {
      console.log("A ocuurido un error: " + error);
    } else {
      res.send(info);
    }
  });
});

//------OBTENER ALUMNOS------------------------

router.get("/obtenerAlumnos", (req, res) => {
  const db = req.app.locals.db;
  const clase = req.query.clase;

  db.collection("alumnos")
    .find({ clase: clase })
    .toArray((error, info) => {
      if (error !== null) {
        console.log("A ocuurido un error: " + error);
      } else {
        res.send(info);
      }
    });
});

//-------DATOS DE UN SOLO ALUMNO --------------------------

router.get("/alumno", (req, res) => {
  const db = req.app.locals.db;
  const email = req.query.email;
  db.collection("alumnos")
    .find({ email: email })
    .toArray((error, info) => {
      if (error !== null) {
        console.log(error);
      } else {
        console.log(info);
        res.send(info);
      }
    });
});

//---------AÑADIR DATOS MODIFICADOS DE EL ALUMNO----------------------

router.put("/editar", (req, res) => {
  const db = req.app.locals.db;
  const alumno = req.body;
  const idAlumno = ObjectID(alumno.id);

  db.collection("alumnos").updateOne(
    { _id: idAlumno },
    {
      $set: {
        nombreAlumno: alumno.nombreAlumno,
        apellidoAlumno: alumno.apellidoAlumno,
        apellidoAlumno2: alumno.apellidoAlumno2,
        edad: alumno.edad,
        nombrePadres: alumno.nombrePadres,
        apellidoPadres: alumno.apellidoPadres,
        apellidoPadres2: alumno.apellidoPadres2,
        dni: alumno.dni,
        telefono: alumno.telefono,
        direccion: alumno.direccion,
        email: alumno.email,
        foto: alumno.foto,
      },
    },
    (error, info) => {
      if (error !== null) {
        console.log("A ocurrido un error modificando: " + error);
      } else {
        res.send(info);
      }
    }
  );
});

//AÑADIR INFORMACION DIARIA DE UN ALUMNO

router.post("/infoDia", (req, res) => {
  const db = req.app.locals.db;
  const usuario = req.body.usuario;
  const datos = req.body;

  db.collection("alumnosDiario").insertOne(
    {
      email: usuario,
      fecha: datos.fecha,
      desayuno: datos.desayuno,
      comida: datos.comida,
      suenyo: datos.suenyo,
      pipi: datos.pipi,
      caca: datos.caca,
      actitud: datos.actitud,
      notas: datos.notas,
    },
    (error, info) => {
      if (error !== null) {
        console.log("A ocurrido un error modificando: " + error);
      } else {
        res.send(info);
      }
    }
  );
});

// OBTENER INFORMACION DIARIA DE UN ALUMNO

router.get("/infoDia", (req, res) => {
  const db = req.app.locals.db;
  const usuario = req.query.usuario;
  const fecha = req.query.fecha;
  db.collection("alumnosDiario")
    .find({ email: usuario, fecha: fecha })
    .toArray((error, info) => {
      if (error !== null) {
        console.log("A ocurrido un error modificando: " + error);
      } else {
        res.send(info);
      }
    });
});

//MODIFICAR INFORMACION DIARIA FICHA ALUMNO

router.put("/editarDiaFicha", (req, res) => {
  const db = req.app.locals.db;
  const usuario = req.body.usuario;
  const fecha = req.body.fecha;
  const desayuno = req.body.desayuno;
  const comida = req.body.comida;
  const suenyo = req.body.suenyo;
  const pipi = req.body.pipi;
  const caca = req.body.caca;
  const actitud = req.body.actitud;
  const notas = req.body.notas;

  db.collection("alumnosDiario").updateOne(
    { email: usuario, fecha: fecha },
    { $set: { fecha, desayuno, comida, suenyo, pipi, caca, actitud, notas } },
    (error, info) => {
      if (error !== null) {
        console.log("A ocurrido un error modificando: " + error);
      } else {
        res.send(info);
      }
    }
  );
});

//OBTENER FECHAS DIARIO

router.get("/fechas", (req, res) => {
  const db = req.app.locals.db;
  const usuario = req.query.email;
  db.collection("alumnosDiario")
    .find({ email: usuario })
    .toArray((error, info) => {
      if (error !== null) {
        console.log("A ocurrido un error modificando: " + error);
      } else {
        res.send(info);
      }
    });
});

//OBETENER INFORMACION DE USUARIO POR FECHA

router.get("/infoFecha", (req, res) => {
  const db = req.app.locals.db;
  const usuario = req.query.email;
  const fecha = req.query.fecha;
  db.collection("alumnosDiario")
    .find({ email: usuario, fecha: fecha })
    .toArray((error, info) => {
      if (error !== null) {
        console.log("A ocurrido un error modificando: " + error);
      } else {
        res.send(info);
      }
    });
});

//ELIMINAR ALUMNOS

router.delete("/baja", (req, res) => {
  const db = req.app.locals.db;
  const email = req.query.data;
  db.collection("alumnos").deleteOne({ email: email }, (error, info) => {
    if (error !== null) {
      console.log("A ocurrido un error modificando: " + error);
    } else {
      res.send(info);
    }
  });
});

//AÑADIR A LA GALERIA DE IMAGENES

router.post("/anyadirGaleria", (req, res) => {
  const db = req.app.locals.db;
  const imagen = req.body;

  db.collection("galeria").insertOne(imagen, (error, info) => {
    if (error !== null) {
      console.log("A ocurrido un error modificando: " + error);
    } else {
      res.send(info);
    }
  });
});

// OBTENER TODAS LAS IMAGENES DE LA GALERIA

router.get("/todasGaleria", (req, res) => {
  const db = req.app.locals.db;

  db.collection("galeria")
    .find()
    .toArray((error, info) => {
      if (error !== null) {
        console.log("A ocurrido un error modificando: " + error);
      } else {
        res.send(info);
      }
    });
});

// OBTENER IMAGENES DE LA GALERIA POR FECHA

router.get("/galeriaFecha", (req, res) => {
  const db = req.app.locals.db;
  const fecha = req.query.fecha;

  db.collection("galeria")
    .find({ fechaEvento: fecha })
    .toArray((error, info) => {
      if (error !== null) {
        console.log("A ocurrido un error modificando: " + error);
      } else {
        res.send(info);
      }
    });
});

//OBTENER SOLO LAS FECHAS DE LAS IMAGENES

router.get("/fechasGaleria", (req, res) => {
  const db = req.app.locals.db;
  db.collection("galeria")
    .find({ fecha }.limit(1))
    .toArray((error, info) => {
      if (error !== null) {
        console.log("A ocurrido un error modificando: " + error);
      } else {
        res.send(info);
      }
    });
});

//ENVIAR DATOS CHAT

router.post("/enviarChat", (req, res) => {
  const db = req.app.locals.db;
  const datos = req.body;

  db.collection("chat").insertOne(datos, (error, info) => {
    if (error !== null) {
      console.log("A ocurrido un error modificando: " + error);
    } else {
      res.send(info);
    }
  });
});

// RECIBIR DATOS CHAT

router.get("/recibirChat", (req, res) => {
  const db = req.app.locals.db;

  db.collection("chat")
    .find()
    .toArray((error, info) => {
      if (error !== null) {
        console.log("A ocurrido un error modificando: " + error);
      } else {
        res.send(info);
      }
    });
});

// ENVIAR DATOS CHAT ADMIN

router.post("/enviarChatAdmin", (req, res) => {
  const db = req.app.locals.db;
  const datos = req.body;

  db.collection("chatAdmin").insertOne(datos, (error, info) => {
    if (error !== null) {
      console.log("A ocurrido un error modificando: " + error);
    } else {
      res.send(info);
    }
  });
});

// RECIBIR DATOS CHAT ADMIN

router.get("/recibirChatAdmin", (req, res) => {
  const db = req.app.locals.db;

  db.collection("chatAdmin")
    .find()
    .toArray((error, info) => {
      if (error !== null) {
        console.log("A ocurrido un error modificando: " + error);
      } else {
        res.send(info);
      }
    });
});

// RECIBIR DATOS CHAT ADMIN POR USUARIO

router.get("/recibirChatAdminUsuario", (req, res) => {
  const db = req.app.locals.db;
  const user = req.query.email;

  db.collection("chatAdmin")
    .find({ email: user })
    .toArray((error, info) => {
      if (error !== null) {
        console.log("A ocurrido un error modificando: " + error);
      } else {
        res.send(info);
      }
    });
});

module.exports = router;
