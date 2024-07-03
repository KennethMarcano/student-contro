import multer from 'multer';
import { extname, resolve } from 'path';

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000)

export default {
  fileFilter: (req, file, cb) => {
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg'){
      return cb(new multer.MulterError('Arquivo precisa ser PNG ou JPEG')) //aqui se verifica que l archivo sea png o jpeg
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'))
    },
    filename: (req, file, cb) => {
      //En el siguiente comando se cambia el nombre del archivo para la fecha en miliseg a partir de 1970 Date.now()
      //con el fin de no tener espacios ni caracteres especiales en el nombre del archivo, para mantener el tipo de archivo
      //se usa el extname() y para garantizar que de verdad sean unicos los nombres de cada archivo se adiciono un numero aleatorio
      //que sera generado por la funcion aleatorio()
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`)
    },
  })
};
