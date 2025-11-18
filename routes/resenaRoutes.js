const express = require("express");
const router = express.Router();

const Resena = require("../models/Resena");
const Juego = require("../models/Juego");


// GET /api/resenas?nombreJuego=texto
router.get("/", async (req, res) => {
  try {
    const { nombreJuego } = req.query;

    if (!nombreJuego || nombreJuego.trim() === "") {
      const resenas = await Resena.find().populate("juego", "nombre plataforma");
      return res.json(resenas);
    }

    const juegos = await Juego.find({
      nombre: { $regex: nombreJuego, $options: "i" }
    });

    if (juegos.length === 0) {
      return res.json([]);
    }

    const ids = juegos.map(j => j._id);

    const resenas = await Resena.find({
      juego: { $in: ids }
    }).populate("juego", "nombre plataforma");

    res.json(resenas);

  } catch (error) {
    console.error("🔥 Error en GET /resenas:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
});


// POST /api/resenas → Crear reseña
router.post("/", async (req, res) => {
  try {
    const { juego, texto, puntuacion, autor } = req.body;

    const juegoEncontrado = await Juego.findOne({
      nombre: { $regex: juego, $options: "i" }
    });

    if (!juegoEncontrado) {
      return res.status(400).json({
        msg: "No existe un juego con ese nombre"
      });
    }

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


// GET /api/resenas/estadisticas/favorito → Juego favorito
router.get("/estadisticas/favorito", async (req, res) => {
  try {
    const resenas = await Resena.find().populate("juego", "nombre plataforma");

    if (resenas.length === 0) {
      return res.json({
        juegoFavorito: null,
        promedio: 0,
        cantidadResenas: 0
      });
    }

    const mapa = {};
    resenas.forEach(r => {
      const id = r.juego._id;
      if (!mapa[id]) {
        mapa[id] = {
          nombre: r.juego.nombre,
          plataforma: r.juego.plataforma,
          total: 0,
          cantidad: 0
        };
      }
      mapa[id].total += r.puntuacion;
      mapa[id].cantidad++;
    });

    let mejorJuego = null;
    let mejorPromedio = -1;

    Object.values(mapa).forEach(j => {
      const promedio = j.total / j.cantidad;

      if (promedio > mejorPromedio) {
        mejorPromedio = promedio;
        mejorJuego = j;
      }
    });

    res.json({
      juegoFavorito: mejorJuego.nombre,
      plataforma: mejorJuego.plataforma,
      promedio: mejorPromedio.toFixed(2),
      cantidadResenas: mejorJuego.cantidad
    });

  } catch (error) {
    console.error("🔥 Error en /estadisticas/favorito:", error);
    res.status(500).json({ msg: "Error calculando estadísticas", error: error.message });
  }
});


// ⭐⭐⭐⭐⭐ NUEVA RUTA ⭐⭐⭐⭐⭐
// GET /api/resenas/estadisticas/todos → estadísticas por cada juego
router.get("/estadisticas/todos", async (req, res) => {
  try {
    const resenas = await Resena.find().populate("juego", "nombre plataforma");

    if (resenas.length === 0) {
      return res.json([]);
    }

    const mapa = {};

    resenas.forEach(r => {
      const id = r.juego._id;

      if (!mapa[id]) {
        mapa[id] = {
          nombre: r.juego.nombre,
          plataforma: r.juego.plataforma,
          total: 0,
          cantidadResenas: 0
        };
      }

      mapa[id].total += r.puntuacion;
      mapa[id].cantidadResenas++;
    });

    const lista = Object.values(mapa).map(j => ({
      nombre: j.nombre,
      plataforma: j.plataforma,
      promedio: (j.total / j.cantidadResenas).toFixed(2),
      cantidadResenas: j.cantidadResenas
    }));

    res.json(lista);

  } catch (error) {
    console.error("🔥 Error estadísticas ALL:", error);
    res.status(500).json({ msg: "Error obteniendo estadísticas" });
  }
});


module.exports = router;
