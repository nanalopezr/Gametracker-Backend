// routes/juegoRoutes.js
const express = require('express');
const router = express.Router();
const {
  crearJuego,
  obtenerJuegos,
  obtenerJuegoPorId,
  actualizarJuego,
  eliminarJuego
} = require('../controllers/juegoController');

// Crear un nuevo juego
router.post('/', crearJuego);

// Obtener todos los juegos
router.get('/', obtenerJuegos);

// Obtener un juego por ID
router.get('/:id', obtenerJuegoPorId);

// Actualizar un juego por ID
router.put('/:id', actualizarJuego);

// Eliminar un juego por ID
router.delete('/:id', eliminarJuego);

module.exports = router;
