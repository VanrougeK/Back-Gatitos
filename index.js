// importar librerias
const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")
// instanciar la app
const app = express()
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"gatitos"
})
db.connect(err => {
    if(err) {
        console.error("Error mysql:", err)
    } else {
        console.log("Conectado a mysql")
    }
})
// aca le decimos middelware para json
app.use(express.json())
app.use(cors())

// configurar puerto
const PORT = 3014

app.post(`/scores`, (req, res) => {
    const {user_id, puntuacion} = req.body

    db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [nombre, puntuacion],
        (err, result) => {
            if(err) return res.status(500).json(err) 
                res.status(201).json({
            nombre, 
            puntuacion
        })
    }
)
})

app.get("/ranking", (req, res) => {
    db.query(`
        SELECT users.username, MAX(scores.puntuacion) AS mejor FROM scores JOIN users ON users.id = scores.user_id GROUP by users.id ORDER BY mejor DESC`,
        (err, results) => {
            if (err) return res.status(500).json(err)
                res.json(results)
        })
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})