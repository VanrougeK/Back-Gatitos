const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { usuario, password } = req.body;
  if (!usuario || !password) {
    return res.status(400).json({
      error: "Faltan datos",
    });
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    await db.query("INSERT INTO users(username, password) VALUES (?, ?)", [
      usuario,
      hash,
    ]);

    return res.json({
      mensaje: "Cuenta creada",
    });
  } catch (err) {}
  (err) => {
    console.log("Error de registro: ", err);
    return res.status(500).json({
      error: "Usuario ya existente o error en el serv.",
    });
  };
};

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const [results] = await db.query("SELECT * FROM users WHERE username = ?", [
      usuario,
    ]);

    if (results.length === 0) {
      return res.status(400).json({
        error: "Usuario no encontrado",
      });
    }

    const user = results[0];
    const valido = await bcrypt.compare(password, user.password);

    if (!valido) {
      return res.status(400).json({
        error: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return res.json({
      token,
      usuario: user.username,
      puntos: user.highscore,
      skin: user.skin_actual,
    });
  } catch (err) {
    console.log("Error en login: ", err);
    return res.status(500).json({
      error: "Error del servidor",
    });
  }
};
