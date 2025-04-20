const express = require('express');
const app = express();

// Conexión a la base de datos
const archivodb = require('./conexion');

// Middlewares
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de productos
const rutaproducto = require('./rutas/producto');
app.use('/api/producto', rutaproducto);

// Rutas de usuarios (🔐 importante para login y registro)
const rutaUsuario = require('./rutas/usuario');
app.use('/api/usuario', rutaUsuario);

// Ruta base
app.get('/', (req, res) => {
    res.send('Bienvenido a nuestro servidor de ventas e inventarios');
});

// Iniciar el servidor
app.listen(5000, function () {
    console.log('✅ Servidor corriendo perfectamente en el puerto 5000');
});
