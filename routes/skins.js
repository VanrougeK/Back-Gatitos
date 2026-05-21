const express = require("express")
const router = express.Router()

const {obtenerSkins, cambiarSkin} = require("../controllers/skinsController")

router.get("/", obtenerSkins)
router.post("/usar", cambiarSkin)

module.exports = router