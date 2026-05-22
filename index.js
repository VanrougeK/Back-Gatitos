// importar librerias
const express = require("express")
const cors = require("cors")
const app = express()
require("dotenv").config()
require("./config/db")
const authRoutes = require("./routes/auth")
const ranking = require("./routes/ranking")
const skinsRoutes = require("./routes/skins")


app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/ranking", ranking)
app.use("/skins", skinsRoutes)

const PORT = process.env.PORT || 3014

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})