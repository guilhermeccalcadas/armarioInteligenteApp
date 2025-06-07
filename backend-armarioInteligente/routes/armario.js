const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if(mimetype && extname){
      return cb(null, true);
    }
    cb(new Error('Só são permitidos ficheiros JPEG, JPG e PNG.'));
  }
});


const roupaController = require("../controller/roupaController");

router.post('/roupa', upload.single('foto'), roupaController.addNewRoupa);
router.get("/roupa", roupaController.getAllRoupa);
router.delete("/roupa/delete-all", roupaController.deleteAll)
router.delete("/roupa/by-id/:id", roupaController.deleteById)

module.exports = router;