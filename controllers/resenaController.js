const Resena = require('../models/Resena'); // Importa el modelo Resena de Mongoose

// C - Crear reseña
exports.crearResena = async (req, res) => {
    try {
        const nuevaResena = new Resena(req.body); // Crea un objeto Resena con los datos enviados en el body
        await nuevaResena.save(); // Guarda la reseña en la base de datos
        res.status(201).json(nuevaResena); // Retorna la reseña creada con código 201
    } catch (error) {
        console.error('Error en crearResena:', error);
        res.status(400).json({ // Si hay error en los datos enviados
            error: 'Error al crear la reseña', 
            details: error.message
        });
    }
};

// R - Obtener todas las reseñas
exports.obtenerResenas = async (req, res) => {
    try {
        // Permite filtrar reseñas por el ID del juego si se envía en la query
        const filtro = req.query.juegoId ? { juego: req.query.juegoId } : {};
        
        // Busca reseñas y trae el nombre del juego relacionado usando populate
        const resenas = await Resena.find(filtro).populate('juego', 'nombre'); 
        res.status(200).json(resenas); // Retorna las reseñas con código 200
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reseñas' }); // Error del servidor
    }
};

// R - Obtener reseña por ID
exports.obtenerResenaPorId = async (req, res) => {
    try {
        const resena = await Resena.findById(req.params.id).populate('juego', 'nombre'); // Busca reseña por ID y trae el nombre del juego
        
        if (!resena) {
            return res.status(404).json({ msg: 'Reseña no encontrada' }); // Si no existe, retorna 404
        }
        
        res.status(200).json(resena); // Retorna la reseña con código 200
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar la reseña' }); // Error del servidor
    }
};

// U - Actualizar reseña
exports.actualizarResena = async (req, res) => {
    try {
        const resena = await Resena.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, // Retorna la reseña actualizada
            runValidators: true // Valida los campos según el modelo
        });
        
        if (!resena) {
            return res.status(404).json({ msg: 'Reseña no encontrada para actualizar' }); // Si no existe
        }
        
        res.status(200).json(resena); // Retorna la reseña actualizada con código 200
    } catch (error) {
        res.status(400).json({ // Error en los datos enviados
            error: 'Error al actualizar la reseña.', 
            details: error.message
        });
    }
};

// D - Eliminar reseña
exports.eliminarResena = async (req, res) => {
    try {
        const resena = await Resena.findByIdAndDelete(req.params.id); // Busca y elimina la reseña por ID

        if (!resena) {
            return res.status(404).json({ msg: 'Reseña no encontrada para eliminar' }); // Si no existe
        }
        
        res.status(200).json({ msg: 'Reseña eliminada exitosamente' }); // Confirmación de eliminación
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la reseña' }); // Error del servidor
    }
};