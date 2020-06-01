var express= require('express');
var router = express.Router();
var model = require('./canciones.model')();

// ruta para postman
// http://localhost:3000/hw/songs

router.get('/', function(req, res, next) {
  res.status(200).json(
    {
      "Instrucciones":"Crear el CRUD bajo el REST API usando JSON EndPoints",
      "Rutas": [ {"router_carreras_js": [
        { "Ruta": "/carreras", "Metodo": "Get", "Parametros": [], "Body": [] },
        { "Ruta": "/carreras/:id", "Metodo": "Get", "Parametros": ["id"], "Body": [] },
        { "Ruta": "/carreras", "Metodo": "Post", "Parametros": [], "Body": ["carrera","observacion","estado"] },
        { "Ruta": "/carreras/:id", "Metodo": "Put", "Parametros": ["id"], "Body": ["carrera", "observacion", "estado"] },
        { "Ruta": "/carreras/:id", "Metodo": "Delete", "Parametros": ["id"], "Body": [] }
      ]
      }, {
          "router_canciones_js": [
            { "Ruta": "/songs", "Metodo": "Get", "Parametros": [], "Body": [] },
            { "Ruta": "/songs/:id", "Metodo": "Get", "Parametros": ["id"], "Body": [] },
            { "Ruta": "/songs", "Metodo": "Post", "Parametros": [], "Body": ["cancion", "autor", "album"] },
            { "Ruta": "/songs/:id", "Metodo": "Put", "Parametros": ["id"], "Body": ["cancion", "autor", "album"] },
            { "Ruta": "/songs/:id", "Metodo": "Delete", "Parametros": ["id"], "Body": [] }
          ]
      }
      ]
    }
  );
});

//----Trabaja Aquí

// CRUD --> Create, Read, Update, Delete
//           POST, GET, PUT, DELETE
//----
/*cancion autor  album )
*/

router.get("/songs", function(req, res){
  model.getAll(function(err, songs){
    if(err){
      console.log(err);
      return res.status(500).json({"error":"Algo Salió mal intente de nuevo."});
    } else {
      return res.status(200).json(songs);
    }
  });
}); // get carreras

router.get("/songs/:id", function(req, res){
  var id = parseInt(req.params.id);
  console.log(id);
  model.getOne(id, function(err, row){
    if(err){
      console.log(err);
      return res.status(500).json({"error":"Algo salió mal, intente de nuevo."});
    } else {
      return res.status(200).json(row);
    }
  });
  //res.status(200).json({"id":id});
}); //get carreras/:id

router.post("/songs", function(req, res){
  // ES6  destruccion de objetos
  var {cancion,autor,album} = req.body;
  model.addOne(cancion, autor, album, function(err, rslt){
    if(err){
      console.log({"Error":err});
      return res.status(500).json({"error":"Algo salio mal intente de nuevo"});
    } else {
      return res.status(200).json({"msg":"Registro Agregado Satisfactoriamente"});
    }
  });
});

router.put("/songs/:id", function(req, res){
  var id = parseInt(req.params.id);
  var {cancion, autor, album} = req.body;
  model.updateOne(id, cancion, autor, album, (err, rslt)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"Algo salio mal, intenta de  nuevo."});
    } else {
      return res.status(500).json({"msg":"Registro Actualizado Satisfactoriamente"});
    }
  });
}); //put carreras/:id

router.delete("/songs/:id", function(req, res){
  var id = parseInt(req.params.id);
  model.deleteOne(id, (err, rslt)=>{
    if (err) {
      console.log(err);
      return res.status(500).json({ "error": "Algo salio mal, intenta de  nuevo." });
    } else {
      return res.status(500).json({ "msg": "Registro Eliminado Satisfactoriamente" });
    }
  });
}); // delete carreras/:id

module.exports = router;

