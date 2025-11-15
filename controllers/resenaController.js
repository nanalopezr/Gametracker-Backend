const Resena = require('../models/Resena'); 
const Juego = require('../models/Juego');

// C - Crear reseña
exports.crearResena = async (req, res) => {
    try {
        const nuevaResena = new Resena(req.body);
        await nuevaResena.save();
        res.status(201).json(nuevaResena);
    } catch (error) {
        console.error('Error en crearResena:', error);
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
            error: 'Error al actualizar la reseña.',
            details: error.message
        });
    }
};

// D - Eliminar reseña
exports.eliminarResena = async (req, res) => {
    try {
        const resena = await Resena.findByIdAndDelete(req.params.id);

        if (!resena) {
            return res.status(404).json({ msg: 'Reseña no encontrada' });
        }

        res.status(200).json({ msg: 'Reseña eliminada' });
    } catch (error) {
        res.status(500).json({
            error: 'Error al eliminar la reseña',
            details: error.message
        });
    }
};
