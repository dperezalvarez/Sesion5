const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');  // Importa 'path' para manejar rutas de archivos
const app = express();

mongoose.connect('mongodb://localhost:27017/miapp', 
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

const Producto = mongoose.model('Producto', new mongoose.Schema({
  nombre: String,
  precio: Number,
  descripcion: String
}));

// Middleware para permitir CORS
app.use(cors());

// Middleware para analizar cuerpos JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.post('/productos', async (req, res) => {
  const nuevoProducto = new Producto(req.body);
  await nuevoProducto.save();
  res.send(nuevoProducto);
});

app.get('/productos', async (req, res) => {
  const productos = await Producto.find();
  res.send(productos);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
