const Resena = require('../models/Resena'); 
const Juego = require('../models/Juego');

// C - Crear reseña
exports.crearResena = async (req, res) => {
    try {
        const nuevaResena = new Resena(req.body);
        await nuevaResena.save();
        res.status(201).json(nuevaResena);
    } catch (error) {
        console.error('Error en crear reseña:', error);
        res.status(400).json({
            error: 'Error al crear la reseña',
            details: error.message
        });
    }
};

// R - Obtener TODAS las reseñas
exports.obtenerResenas = async (req, res) => {
    try {
        const resenas = await Resena.find().populate("juego", "nombre plataforma");
        res.status(200).json(resenas);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener las reseñas',
            details: error.message
        });
    }
};

// U - Actualizar reseña
exports.actualizarResena = async (req, res) => {
    try {
        const resena = await Resena.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!resena) {
            return res.status(404).json({ msg: 'Reseña no encontrada' });
        }

        res.status(200).json(resena);
    } catch (error) {
        res.status(400).json({
            error: 'Error en actualizar la reseña.',
            details: error.message
        });
    }
};

// D - Eliminar reseña
export const eliminarResena = async (req, res) => {
  try {
    const id = req.params.id;

    const eliminada = await Resena.findByIdAndDelete(id);

    if (!eliminada) {
      return res.status(404).json({ msg: "Reseña no encontrada" });
    }

    res.json({ msg: "Reseña eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar reseña" });
  }
};

