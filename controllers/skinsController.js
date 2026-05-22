const db = require("../config/db");

const obtenerSkins = async (req, res) => {
  try {
    const [results] = await db.query (
      `SELECT id, nombre, archivo, pts_req FROM skins`
    )
    res.json(results)
  } catch (err) {
console.log(err);
        return res.status(500).json({
          error: "Error al obtener skins",
        })
  }
}
const cambiarSkin = (req, res) => {
  res.json({
    mensaje: "Skin cambiada",
  });
};
module.exports = { obtenerSkins, cambiarSkin };
