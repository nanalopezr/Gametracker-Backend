const mongoose = require("mongoose");

const ResenaSchema = new mongoose.Schema({
  juego: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Juego", 
    required: true 
  },
  texto: { type: String, required: true },
  puntuacion: { type: Number, required: true },
  autor: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model("Resena", ResenaSchema);
