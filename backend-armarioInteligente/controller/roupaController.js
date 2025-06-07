const Roupa = require("../models/roupa");
const asyncHandler = require("express-async-handler")
const fs = require('fs');
const path = require('path');

exports.addNewRoupa = asyncHandler(async (req, res, next) => {
  const fotoUrl = req.file ? `/uploads/${req.file.filename}` : '';

  const existente = await Roupa.findOne({ nome: req.body.nome });
  if (existente) {
    return res.status(400).json({ message: 'Já existe uma roupa com esse nome.' });
  }

  const roupa = new Roupa({
    nome: req.body.nome,
    categoria: req.body.categoria,
    fotoUrl: fotoUrl,
    cor: req.body.cor,
    tamanho: req.body.tamanho,
    marca: req.body.marca,
    dataUltimoUso: req.body.dataUltimoUso
  });

  await roupa.save();
  res.status(201).json(roupa);
});


exports.getAllRoupa = asyncHandler(async (req, res, next) => {
    try{
        const allRoupas = await Roupa.find().exec();
        res.json(allRoupas);
    }catch (error){
        next(error)
    }
});



exports.deleteAll = asyncHandler(async (req, res, next) => {
  // Apaga todos os documentos do MongoDB
  await Roupa.deleteMany({});

  // Apaga todos os ficheiros na pasta 'uploads'
  const uploadsDir = path.join(__dirname, '..', 'uploads');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Erro a ler a pasta uploads:', err);
      return res.status(500).json({ message: 'Erro ao apagar fotos.' });
    }

    files.forEach(file => {
      const filePath = path.join(uploadsDir, file);
      fs.unlink(filePath, err => {
        if (err) {
          console.error('Erro a apagar ficheiro:', filePath, err);
        }
      });
    });

    // Depois de iniciar a eliminação dos ficheiros, responde sucesso
    res.status(200).json({ message: 'Todos os itens e fotos foram apagados com sucesso.' });
  });
});


exports.deleteById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log("Estou aqui no delete")

  // Busca o documento pelo id
  const roupa = await Roupa.findById(id);

  if (!roupa) {
    return res.status(404).json({ message: 'Item não encontrado' });
  }

  // Apaga o documento do MongoDB
  await roupa.deleteOne();

  // Apaga o ficheiro da foto se existir
  if (roupa.foto) {
    const filePath = path.join(__dirname, '..', 'uploads', roupa.foto);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Erro ao apagar foto:', err);
        // Não bloqueia a resposta, só avisa no log
      }
    });
  }

  res.status(200).json({ message: 'Item e foto apagados com sucesso.' });
});