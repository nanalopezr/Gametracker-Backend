const mongoose = require('mongoose'); // Importa Mongoose
const { Schema } = mongoose; // Extrae la clase Schema de Mongoose

// Define el esquema para la reseña
const ResenaSchema = new mongoose.Schema({
  
  // Relaciona la reseña con un juego específico
  juego: {
    type: Schema.Types.ObjectId, // Tipo ObjectId para relacionar con otro documento
    ref: 'Juego', // Hace referencia al modelo Juego
    required: true // Campo obligatorio
  },

  puntuacion: {  
    type: Number, // Tipo de dato Number
    required: true, // Obligatorio
    min: 1, // Valor mínimo permitido
    max: 5  // Valor máximo permitido
  },

  texto: { 
    type: String, // Tipo de dato String
    required: [true, 'El texto de la reseña es obligatorio'] // Obligatorio con mensaje de error
  },
  
  autor: {
    type: String, // Tipo de dato String
    default: 'Usuario GameTracker' // Valor por defecto si no se envía autor
  }

}, {
  timestamps: true // Agrega automáticamente createdAt y updatedAt
});

// Exporta el modelo Resena para usarlo en controladores
module.exports = mongoose.model('Resena', ResenaSchema);