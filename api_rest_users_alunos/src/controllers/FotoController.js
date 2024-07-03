import multer from 'multer';
import multerConfig from "../config/multerConfig";

import Foto from '../models/Foto';
import Aluno from '../models/Aluno'

const upload = multer(multerConfig).single('foto');


class FotoController {
  store(req, res) {
    try {
      return upload(req, res, async (error) => {
        if (error) return res.status(400).json({
          errors: [error.code]
        })

        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        if(!(await Aluno.findByPk(aluno_id))) return res.status(400).json({
          errors: ['Aluno nao existe.']
        })


        const foto = await Foto.create({ originalname, filename, aluno_id });

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

export default new FotoController();
