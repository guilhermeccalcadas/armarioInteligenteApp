const Roupa = require("../models/roupa");
const asyncHandler = require("express-async-handler")

exports.addNewRoupa = asyncHandler(async (req, res, next) => {
  const fotoUrl = req.file ? `/uploads/${req.file.filename}` : '';

  const roupa = new Roupa({
    nome: req.body.nome,
    categoria: req.body.categoria,
    fotoUrl: fotoUrl,
    cor: req.body.cor,
    tamanho: req.body.tamanho,
    marca: req.body.marca,
    dataAquisicao: req.body.dataAquisicao
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