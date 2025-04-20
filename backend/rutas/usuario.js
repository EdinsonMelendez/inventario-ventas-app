// C:\Users\Edinson-melendez\OneDrive\Escritorio\Sena\Full Stack\backend\rutas\usuario.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Esquema del usuario
const esquemaUsuario = new mongoose.Schema({
    nombre: String,
    email: String,
    password: String
});

const ModeloUsuario = mongoose.model('usuarios', esquemaUsuario);

// Ruta para registrar un nuevo usuario
router.post('/registrar', async (req, res) => {
    try {
        const nuevoUsuario = new ModeloUsuario({
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password
        });

        await nuevoUsuario.save();
        res.status(200).send('Usuario registrado exitosamente');
    } catch (error) {
        console.error('Error registrando usuario:', error);
        res.status(500).send('Error al registrar el usuario');
    }
});

// Ruta para login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await ModeloUsuario.findOne({ email, password });

        if (usuario) {
            res.status(200).json({
                nombre: usuario.nombre,
                email: usuario.email,
                id: usuario._id
            });
        } else {
            res.status(401).send('Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).send('Error al iniciar sesión');
    }
});

module.exports = router;
