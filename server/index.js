const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require("mysql")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: " ",
    database: "vilonews"
})

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

app.get("/api/get",(req,res)=>{
    const sqlNoticias = "SELECT * FROM noticias"
    db.query(sqlNoticias,(err,result)=>{
        res.send(result)
    })
})

var logueado = false

app.post("/api/login",(req,res)=>{
    const usuario = req.body.usuario
    const contraseña = req.body.contraseña

    const verificar = `SELECT * FROM usuarios WHERE usuario = "${usuario}" and contraseña = "${contraseña}"`
    db.query(verificar,(err,result)=>{
        console.log(result)
        res.send(result)
    })
})


var PORT = 3001;
app.listen(PORT,()=>{
    console.log("Running on port 3001")
})