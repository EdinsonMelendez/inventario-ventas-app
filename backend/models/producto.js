const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
  idProducto: String,      // Identificador único del producto
  nombre: String,          // Nombre del producto
  descripcion: String,     // Descripción del producto
  precio: Number,          // Precio del producto
  cantidad: Number         // Cantidad disponible en inventario
});

const ModeloProducto = mongoose.model('producto', productoSchema);
module.exports = ModeloProducto;
