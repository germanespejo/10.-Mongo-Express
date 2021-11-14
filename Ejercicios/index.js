const express = require('express');
const app = express();
app.listen(3001);
app.use(express.static("public"));
// Declaramos aquí db para poder usarlo y que la variable no expire fuera de su if:
let db;
const mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017', function (err, client) {
    if (err !== undefined) {
        console.log(err);
    } else {
        // Aqui utilizaremos client para conectarse a la base de datos:
        db = client.db('mesas');
    }
});

//1. Método GET y ruta ‘/api/mesas’. Mostrará todas las mesas que tenemos en la base de datos.

app.get('/api/mesas', function (req, res) {
    db.collection('mesas').find().toArray(function (err, datos) {
        if (err != undefined) {
            console.log(err);
            res.send({ mensaje: 'error: ' + err });
        } else {
            console.log(datos);
            res.send(datos);
        }
    });
});

//2. Método POST y ruta ‘/api/anyadir’. Añadiremos una nueva mesa a la base de datos.

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.post('/api/anyadir', function (req, res) {
    let nombreVar = req.body.nombre;
    let tamanyoVar = req.body.tamanyo;
    let colorVar = req.body.color;
    let materialVar = req.body.material;
    let patasVar = req.body.patas;
    db.collection('mesas').insertOne({
        Nombre: nombreVar,
        Tamaño: tamanyoVar,
        Color: colorVar,
        Material: materialVar,
        Patas: patasVar,
    }, function (err, datos) {
        if (err != undefined) {
            console.log(err);
            res.send({ mensaje: 'error: ' + err });
        } else {
            console.log(datos);
            res.send(datos);
        }
    })
})

//3. Método PUT y ruta ‘/api/modificar/:color’. Todas las mesas del color indicado en la
// ruta cambiarán su color a granate.

app.put('/api/modificar/:color', function (req, res) {
    let color = req.params.color;
    db.collection('mesas').updateMany(
        { Color: color },
        { $set: { Color: 'granate' } },
        function (err, datos) {
            if (err !== undefined) {
                console.log(err);
                res.send({ mensaje: "error" + err });
            } else {
                res.send(datos);
            }
        })
})

//4. Método DELETE y ruta ‘/api/borrar/:patas. Borrará la(s) mesa(s) con el número de patas indicado.

