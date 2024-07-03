import Aluno from '../models/Aluno'
import Foto from '../models/Foto'

class AlunoController {
  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);
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
      const Alunos = await Aluno.findAll({
        attributes: ["id", "nome", "sobrenome", "email", "idade", "peso", "altura"],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
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

      const aluno = await Aluno.findByPk(id, {
        attributes: ["id", "nome", "sobrenome", "email", "idade", "peso", "altura"],
        order: [[Foto, 'id', 'DESC']],
        include: {
          model: Foto,
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
      const aluno = await Aluno.findByPk(id);
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
      const aluno = await Aluno.findByPk(id);
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
export default new AlunoController();
