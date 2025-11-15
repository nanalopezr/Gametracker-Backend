const express = require("express");
const router = express.Router();

const Resena = require("../models/Resena");
const Juego = require("../models/Juego");

// GET /api/resenas?nombreJuego=texto
router.get("/", async (req, res) => {
  try {
    const { nombreJuego } = req.query;

    // ➤ SIN filtro → devolver TODAS las reseñas
    if (!nombreJuego || nombreJuego.trim() === "") {
      const resenas = await Resena.find().populate("juego", "nombre plataforma");
      return res.json(resenas);
    }

    // ➤ Buscar juegos que coincidan con el nombre
    const juegos = await Juego.find({
      nombre: { $regex: nombreJuego, $options: "i" }
    });

    if (juegos.length === 0) {
      return res.json([]);
    }

    const ids = juegos.map(j => j._id);

    // ➤ Buscar reseñas asociadas a esos juegos
    const resenas = await Resena.find({
      juego: { $in: ids }
    }).populate("juego", "nombre plataforma");

    res.json(resenas);

  } catch (error) {
    console.error("🔥 Error en GET /resenas:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
});
// POST /api/resenas  → Crear reseña usando nombre del juego
router.post("/", async (req, res) => {
  try {
    const { juego, texto, puntuacion, autor } = req.body;

    // 1️⃣ Buscar el juego por NOMBRE
    const juegoEncontrado = await Juego.findOne({
      nombre: { $regex: juego, $options: "i" }
    });

    if (!juegoEncontrado) {
      return res.status(400).json({
        msg: "No existe un juego con ese nombre"
      });
    }

    // 2️⃣ Crear reseña usando el ID encontrado
    const nueva = new Resena({
      juego: juegoEncontrado._id,
      texto,
      puntuacion,
      autor
    });

    await nueva.save();

    res.json({ msg: "Reseña creada", reseña: nueva });

  } catch (error) {
    console.error("🔥 Error al crear reseña:", error);
    res.status(500).json({
      msg: "Error al crear la reseña",
      error: error.message
    });
  }
});


module.exports = router;
