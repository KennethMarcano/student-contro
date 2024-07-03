"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class AlunoController {
  async store(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);
      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(error => error.message)
      }
      )
    }
  }

  // Index
  async index(req, res) {
    try {
      const Alunos = await _Aluno2.default.findAll({
        attributes: ["id", "nome", "sobrenome", "email", "idade", "peso", "altura"],
        order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
        include: {
          model: _Foto2.default,
          attributes: ["filename", "url"],
        },
      });
      return res.json(Alunos);
    } catch (e) {
      return res.json(null)
    }
  }

  // Show

  async show(req, res) {
    try {
      const { id } = req.params;
      //no esta funcionando si el id esta vacio, REVISAR
      if (!id) return res.status(401).json({
        errors: ['ID invalido']
      });

      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: ["id", "nome", "sobrenome", "email", "idade", "peso", "altura"],
        order: [[_Foto2.default, 'id', 'DESC']],
        include: {
          model: _Foto2.default,
          attributes: ["filename", "url"],
        },
      });

      if (!aluno) return res.status(401).json({
        errors: ['ID não existe']
      });

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(error => error.message)
      })
    }
  }

  // Update

  async update(req, res) {
    try {
      const { id } = req.params;
      const aluno = await _Aluno2.default.findByPk(id);
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe.']
        })
      };

      const alunoAtualizado = await aluno.update(req.body)
      return res.json(alunoAtualizado);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(error => error.message)
      })
    }
  }

  // Delete

  async delete(req, res) {
    try {
      const { id } = req.params;
      const aluno = await _Aluno2.default.findByPk(id);
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe.']
        })
      };
      await aluno.destroy();
      return res.json("Aluno apagado");
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(error => error.message)
      })
    }
  }

}
exports. default = new AlunoController();
