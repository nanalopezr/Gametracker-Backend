const mongoose = require('mongoose'); // Importa Mongoose para definir esquemas y modelos

// Define el esquema para el videojuego
const JuegoSchema = new mongoose.Schema({

  nombre: { 
    type: String, // Tipo de dato String
    required: [true, 'El nombre del juego es obligatorio'], // Campo obligatorio con mensaje de error
    trim: true, // Elimina espacios al inicio y fin
    unique: true // No permite nombres duplicados en la base de datos
  },

  plataforma: {
    type: String, // Tipo de dato String
    required: [true, 'La plataforma es obligatoria'] // Campo obligatorio con mensaje
  },

  portadaURL: { 
    type: String, // URL de la portada (imagen) del juego
    required: false // No es obligatorio
  },

  estado: {
    type: String, // Tipo de dato String
    enum: ['Pendiente', 'Jugando', 'Completado'], // Valores permitidos
    default: 'Pendiente' // Valor por defecto
  },

  horasJugadas: { 
    type: Number, // Tipo de dato Number
    default: 0, // Valor inicial 0
    min: 0 // No permite números negativos
  }

}, {
  timestamps: true // Agrega automáticamente campos createdAt y updatedAt
});

// Exporta el modelo Juego para usarlo en controladores
module.exports = mongoose.model('Juego', JuegoSchema);