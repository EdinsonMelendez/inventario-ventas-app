const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const esquema = mongoose.Schema;

// Definir el esquema del producto
const esquemaProducto = new esquema({
    nombreProducto: String,
    descripcion: String,
    cantidad: Number,
    precio: Number,
    categoria: String,
    codigoProducto: { type: String, unique: true } // Establecer como único
});

// Crear el modelo de MongoDB
const ModeloProducto = mongoose.model('productos', esquemaProducto);

// Ruta para agregar un nuevo producto
router.post('/agregarproducto', async (req, res) => {
    try {
        const nuevoProducto = new ModeloProducto(req.body);
        const productoGuardado = await nuevoProducto.save();
        res.status(200).send('Producto agregado correctamente');
    } catch (err) {
        console.error('❌ Error al guardar el producto:', err);
        res.status(500).json({ error: 'Error al agregar el producto', detalles: err.message });
    }
});

// Obtener todos los productos
router.get('/obtenerproductos', async (req, res) => {
    try {
        const productos = await ModeloProducto.find({});
        res.status(200).send(productos);
    } catch (err) {
        console.error('❌ Error al obtener los productos:', err);
        res.status(500).json({ error: 'Error al obtener los productos', detalles: err.message });
    }
});

// Obtener un producto específico por su código
router.get('/obtenerdataproducto', async (req, res) => {
    try {
        const producto = await ModeloProducto.find({ codigoProducto: req.query.codigoProducto });
        res.status(200).send(producto);
    } catch (err) {
        console.error('❌ Error al obtener el producto:', err);
        res.status(500).json({ error: 'Error al obtener el producto', detalles: err.message });
    }
});

// Editar un producto existente
router.post('/editarproducto', async (req, res) => {
    try {
        const { codigoProducto, nombreProducto, descripcion, cantidad, precio, categoria } = req.body;

        const productoActualizado = await ModeloProducto.findOneAndUpdate(
            { codigoProducto }, 
            { nombreProducto, descripcion, cantidad, precio, categoria }, 
            { new: true }
        );

        if (!productoActualizado) {
            return res.status(404).json({ error: 'Producto no encontrado', codigoProducto });
        }

        res.status(200).send(productoActualizado);
    } catch (err) {
        console.error('❌ Error al actualizar el producto:', err);
        res.status(500).json({ error: 'Error al actualizar el producto', detalles: err.message });
    }
});

// Eliminar un producto
router.delete('/eliminarproducto', async (req, res) => {
    try {
        const { codigoProducto } = req.body;
        const productoEliminado = await ModeloProducto.findOneAndDelete({ codigoProducto });
        if (!productoEliminado) {
            return res.status(404).json({ error: 'Producto no encontrado', codigoProducto });
        }
        res.status(200).send('Producto eliminado con éxito');
    } catch (err) {
        console.error('❌ Error al eliminar el producto:', err);
        res.status(500).json({ error: 'Error al eliminar el producto', detalles: err.message });
    }
});

module.exports = router;
