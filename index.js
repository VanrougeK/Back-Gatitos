// importar librerias
const express = require("express")

// instanciar la app
const app = express()

// aca le decimos middelware para json
app.use(express.json())

// configurar puerto
const PORT = 3014

app.get("/", (req, res) => {
    res.send("Hola mundo desde backend")
})

let users = [{id:1, nombre:`golda`}]
app.get(`/users`, (req, res) => res.json(users))
app.post(`/users`, (req, res) => {
    const nuevo = {id:users.length+1, ...req.body}
    users.push(nuevo);
    res.status(201).json(nuevo)
})

app.get(`/users/:id`, (req, res) => {
    const idDelete = parseInt(req.params.id)
    const index = users.findIndex (u => u.id === idDelete)
    if(index === -1) {
        return res.status(404).json({
            error: "Usuario no encontrado",
            message: `No existe un usuario con el id ${idDelete}`
        })
    }
    const userElimated = users.splice(index,1)

    res.json ({
        message: "Usuario eliminado",
        users:userElimated[0]
    })
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})