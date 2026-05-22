const db = require("../config/db");
exports.obtenerRanking = async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT username, highscore FROM users ORDER BY highscore DESC LIMIT 20",
    );
    res.json(results);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error al obtener el ranking" });
  }
};

exports.guardarPuntuacion = async (req, res) => {
  const { puntuacion } = req.body;
  const userId = req.user?.id;
  console.log(req.body, "userId", userId);
  if (!userId) {
    return res.status(401).json({ error: "No autenticado" });
  }

  try {
    const [results] = await db.query(
      "SELECT highscore FROM users WHERE id = ?",
      [userId],
    );
    if (results.length === 0) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }
    const highscoreActual = results[0].highscore;
    console.log(
      "Highscore actual:",
      highscoreActual,
      "Puntuacion:",
      puntuacion,
    );

    if (puntuacion > highscoreActual) {
      await db.query("UPDATE users SET highscore = ? WHERE id = ?", [
        puntuacion,
        userId,
      ]);
      res.json({
        mensaje: "Nuevo record registrado",
      });
    } else {
      res.json({ mensaje: "Puntuacion no supera el record" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error del servidor" });
  }
};
