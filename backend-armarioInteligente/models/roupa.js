const mongoose = require('mongoose');

const roupaSchema = new mongoose.Schema({
  nome: { type: String },
  
  categoria: { 
    type: String, 
    enum: ['cabeça', 'tronco', 'pernas', 'calçado'],
    required: true
  },
  
  fotoUrl: { type: String },
  cor: { type: String },
  
  tamanho: { 
    type: String, 
    enum: ['XS', 'S', 'M', 'L', 'XL'],
    required: true
  },
  
  marca: { type: String },

  dataUltimoUso: { 
    type: Date,
    default: null
  }
});

const Roupa = mongoose.model('Roupa', roupaSchema);
module.exports = Roupa;

