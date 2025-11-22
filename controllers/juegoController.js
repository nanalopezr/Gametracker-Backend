const Juego = require('../models/Juego');

// C - Crear juego
exports.crearJuego = async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body);
    await nuevoJuego.save();
    res.status(201).json(nuevoJuego);
  } catch (error) {
    console.error('Error al crear el juego:', error);
    res.status(400).json({
      error: 'Error al crear el juego',
      details: error.message
    });
  }
};

// R - Obtener todos los juegos (con filtros)
exports.obtenerJuegos = async (req, res) => {
  try {
    const { nombre, plataforma, estado, genero } = req.query;
    let filtro = {};

    if (nombre) filtro.nombre = { $regex: nombre, $options: "i" };
    if (plataforma) filtro.plataforma = { $regex: plataforma, $options: "i" };
    if (estado) filtro.estado = estado;

    const juegos = await Juego.find(filtro);
    res.status(200).json(juegos);
  } catch (error) {
    console.error(" Error al obtener los juegos:", error);
    res.status(500).json({ error: "Error al obtener los juegos" });
  }
};


// R - Obtener juego por ID
exports.obtenerJuegoPorId = async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) {
      return res.status(404).json({ msg: 'Juego no encontrado' });
    }
    res.status(200).json(juego);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener juego' });
  }
};

// U - Actualizar juego
exports.actualizarJuego = async (req, res) => {
  try {
    const juego = await Juego.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!juego) {
      return res.status(404).json({ msg: 'Juego no encontrado para actualizar' });
    }
    res.status(200).json(juego);
  } catch (error) {
    res.status(400).json({
      error: 'Error al actualizar juego',
      details: error.message
    });
  }
};

// D - Eliminar juego
exports.eliminarJuego = async (req, res) => {
  try {
    const juego = await Juego.findByIdAndDelete(req.params.id);
    if (!juego) {
      return res.status(404).json({ msg: 'Juego no encontrado para eliminar' });
    }
    res.status(200).json({ msg: 'Juego eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el juego' });
  }
};
