const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require("mysql")
const React = require('react');
const config = require('./dbconfig.js')

const db = mysql.createPool(config)

app.use(cors())
app.use(express.json({limit: '50mb',parameterLimit:5000000}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:5000000}));

app.post("/api/insert",(req, res)=> {
    const titulo = req.body.titulo
    const info = req.body.info
    const categoria = req.body.categoria
    const fechatexto = req.body.fechatexto
    const fechaformato = req.body.fechaformato
    const imagen = req.body.imagen

    const sqlInsert = "INSERT INTO noticias (titulo, info, categoria, imagen, fechatexto, fechaformato) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert,[titulo,info,categoria,imagen,fechatexto,fechaformato],(err, result)=>{
        res.send("Query realizada con exito")
    })
})

app.post("/api/update",(req,res)=>{
    const idnoticia = req.body.idnoticia
    const titulo = req.body.titulo
    const info = req.body.info
    const categoria = req.body.categoria
    const imagen = req.body.imagen

    const sqlUpdate = `UPDATE noticias SET titulo = ?, info = ?, categoria = ?, imagen = ? WHERE idnoticia = ${idnoticia}`

    db.query(sqlUpdate,[titulo,info,categoria,imagen,idnoticia],(err, result)=>{
        res.send("Noticia editada con exito")
    })
})

app.post("/api/eliminar",(req,res)=>{
    const idnoticia = req.body.idnoticia
    const sqlDelete = `DELETE FROM noticias WHERE idnoticia = ${idnoticia}`
    db.query(sqlDelete,[idnoticia],(err, result)=>{
        res.send("Noticia eliminada con exito")
    })
})

app.get("/api/get",(req,res)=>{
    const sqlNoticias = "SELECT * FROM noticias"
    db.query(sqlNoticias,(err,result)=>{
        res.send(result)
    })
})

app.post("/api/login",(req,res)=>{
    const usuario = req.body.usuario
    const contraseña = req.body.contraseña

    const verificar = `SELECT * FROM usuarios WHERE usuario = "${usuario}" and contraseña = "${contraseña}"`
    db.query(verificar,(err,result)=>{
        res.send(result)
    })
})

app.get("/*", function (req, res) {
    res.sendFile('/home/feder112/public_html/index.html', function (err) {
        if (err) {
        res.status(500).send(err);
        }
    });
});

var PORT = 3306;

app.listen(PORT,()=>{
    console.log("Running on port 3306")
})