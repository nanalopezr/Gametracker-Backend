// routes/resenaRoutes.js
const express = require('express');
const router = express.Router();
const {
  crearResena,
  obtenerResenas,
  obtenerResenaPorId,
  actualizarResena,
  eliminarResena
} = require('../controllers/resenaController');

// Crear una reseña
router.post('/', crearResena);

// Obtener todas las reseñas o por juego (si se pasa ?juegoId=...)
router.get('/', obtenerResenas);

// Obtener reseña por ID
router.get('/:id', obtenerResenaPorId);

// Actualizar reseña
router.put('/:id', actualizarResena);

// Eliminar reseña
router.delete('/:id', eliminarResena);

module.exports = router;
