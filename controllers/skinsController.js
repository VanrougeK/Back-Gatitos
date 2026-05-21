const db = require("../config/db");

const obtenerSkins = (req, res) => {
  db.query(
    `SELECT id, nombre, nombre, requisito_puntos FROM skins`,
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Error al obtener skins",
        });
      }
      res.json(results);
    },
  );
};
const cambiarSkin = (req, res) => {
  res.json({
    mensaje: "Skin cambiada",
  });
};
module.exports = { obtenerSkins, cambiarSkin };
