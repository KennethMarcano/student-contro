"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);

var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);
var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);

const upload = _multer2.default.call(void 0, _multerConfig2.default).single('foto');


class FotoController {
  store(req, res) {
    try {
      return upload(req, res, async (error) => {
        if (error) return res.status(400).json({
          errors: [error.code]
        })

        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        if(!(await _Aluno2.default.findByPk(aluno_id))) return res.status(400).json({
          errors: ['Aluno nao existe.']
        })


        const foto = await _Foto2.default.create({ originalname, filename, aluno_id });

        return res.json(foto);
      });


    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(error => error.message)
      }
      )
    }
  }
}

exports. default = new FotoController();
