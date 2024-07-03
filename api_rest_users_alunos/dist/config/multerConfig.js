"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000)

exports. default = {
  fileFilter: (req, file, cb) => {
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg'){
      return cb(new _multer2.default.MulterError('Arquivo precisa ser PNG ou JPEG')) //aqui se verifica que l archivo sea png o jpeg
    }

    return cb(null, true);
  },
  storage: _multer2.default.diskStorage({
    destination: (req, file, cb) => {
      cb(null, _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images'))
    },
    filename: (req, file, cb) => {
      //En el siguiente comando se cambia el nombre del archivo para la fecha en miliseg a partir de 1970 Date.now()
      //con el fin de no tener espacios ni caracteres especiales en el nombre del archivo, para mantener el tipo de archivo
      //se usa el extname() y para garantizar que de verdad sean unicos los nombres de cada archivo se adiciono un numero aleatorio
      //que sera generado por la funcion aleatorio()
      cb(null, `${Date.now()}_${aleatorio()}${_path.extname.call(void 0, file.originalname)}`)
    },
  })
};
