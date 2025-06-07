const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
const armario = require('./routes/armario');
app.use('/', armario);

mongoose.set("strictQuery", false);

const mongodb = "mongodb+srv://guilhermeccalcadas:72Balerion19@cluster0.r9lhwua.mongodb.net/armario?retryWrites=true&w=majority&appName=Cluster0";

async function main() {
  try {
    await mongoose.connect(mongodb);
    console.log('MongoDB conectado com sucesso!');

    const PORT = 3000;
    app.listen(PORT, '0.0.0.0',() => {
      console.log(`🚀 Servidor a correr em http://192.168.1.70:${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
  }
}

const multer = require('multer');

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


main();

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor backend a funcionar!');
});

module.exports = app;
