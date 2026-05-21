const db = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    const { usuario, password } = req.body
    if(!usuario || !password){
        return res.status(400).json({
            error: "Faltan datos"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    db.query(
        "INSERT INTO users(username, password) VALUES (?, ?)", [usuario, hash], (err) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    error: "Usuario ya existe"
                })
            }
            res.json({
                mensaje: "Cuenta creada"
            })
        }
    )
}

exports.login = (req, res) => {
    const { usuario, password } = req.body

    db.query(
        "SELECT * FROM users WHERE username = ?", [usuario], async (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).json({
                    error: "Error del servidor"
                })
            }
            if(results.length === 0) {
                return res.status(400).json({
                    error: "Usuario no encontrado"
                })
            }

            const user = results[0]
            const valido = await bcrypt.compare(password, user.password)

            if(!valido){
                return res.status(400).json({
                    error: "Contraseña incorrecta"
                })
            }

            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)

            res.json({token, usuario:user.username, puntos:user.highscore, skin: user.skin_actual})
        }
    )
}