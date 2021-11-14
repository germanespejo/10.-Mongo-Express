// install express mongodb

const express = require("express");
const mongodb = require("mongodb");

let app = express();
app.listen(3001);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
let db;
let MongoClient = mongodb.MongoClient;
//La url es siempre "mongodb://127.0.0.1:27017/":
MongoClient.connect('mongodb://127.0.0.1:27017/', function (err, client) {
    //Si hay errores, los pinta:
    if (err !== undefined) {
        console.log(err);
        //Si no hay errores, continúa:
    } else {
        db = client.db('naves2');
    }
});

    app.get("/:nombreParametro", function (req, res) {
        let valorABuscar = req.params.nombreParametro;
        db.collection("naves2").find({ planeta: valorABuscar }).toArray(function (err, datos) {
            if (err != undefined) {
                console.log(err);
                res.send({ mensaje: "error: " + err });
            } else {
                console.log(datos);
                res.send(datos);
            }
        });
    });