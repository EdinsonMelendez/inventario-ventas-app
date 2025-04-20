const mongoose = require('mongoose');

// Conectar a MongoDB (puedes cambiar el nombre de la base de datos si es necesario)
mongoose.connect('mongodb://127.0.0.1:27017/dbventas_inventarios');

// Obtener la conexión
const objetodb = mongoose.connection;

// Verificar la conexión
objetodb.on('connected', () => {
    console.log('Conexión correcta a la base de datos dbventas_inventarios');
});

objetodb.on('error', (err) => {
    console.log('Error en la conexión a la base de datos:', err);
});

module.exports = mongoose;