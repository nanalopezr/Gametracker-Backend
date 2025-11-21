require('dotenv').config(); // Carga las variables de entorno del archivo .env

const express = require('express'); // Importa Express
const mongoose = require('mongoose'); // Importa Mongoose
const cors = require('cors'); //  Importa CORS
const app = express(); // Crea la app de Express

const PORT = process.env.PORT || 3000; // Puerto del servidor
const MONGODB_URL = process.env.MONGODB_URL; // URL de conexión a MongoDB

// MIDDLEWARES
app.use(cors()); //  Permite que React (puerto 5173) se conecte sin error
app.use(express.json()); // Permite leer JSON en las solicitudes
app.use(require("./routes/resenaRoutes"));


// CONEXIÓN A LA BASE DE DATOS
mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log('Conexión exitosa a MongoDB Atlas');
    })
    .catch(err => {
        console.log('Error de conexión:', err.message);
        process.exit(1);
    });

// RUTAS
const juegoRoutes = require('./routes/juegoRoutes');
app.use('/api/juegos', juegoRoutes);

const resenasRoutes = require('./routes/resenaRoutes');
app.use('/api/resenas', resenasRoutes);

// INICIAR SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
