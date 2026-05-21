const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")

const {obtenerRanking, guardarPuntuacion} = require("../controllers/rankingController")

router.get("/", obtenerRanking)
router.post("/score", authMiddleware, guardarPuntuacion)

module.exports = router