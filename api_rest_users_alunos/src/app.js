import dotenv from 'dotenv';
import { resolve } from 'path';
import cors from 'cors';
import express from 'express';
import delay from 'express-delay';
import helmet from 'helmet';

dotenv.config()

//importaciones locales
import './database'
import homeRoutes from './routes/homeRoutes'
import userRoutes from './routes/userRoutes'
import tokenRoutes from './routes/tokenRoutes'
import alunoRoutes from './routes/alunoRoutes'
import fotoRoutes from './routes/fotoRoutes'

const whiteList = [
  'http://35.199.67.52:82',
  'http://localhost:3000'
]

const corsOptions = {
  origin: function(origin, callback) {
    if(whiteList.indexOf(origin) !== -1 || !origin) return callback(null, true);
    else return callback(new Error('Not allowed by CORS'));
  }
}

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(cors(corsOptions)); //aqui se restringe los accesos solo para las url de la whitelist
    this.app.use(helmet({
      crossOriginEmbedderPolicy: false,
    }));
    this.app.use(delay(500));
     // middleware que sirve para recibir los datos de un formulario como un objeto com parametros bien definidos
    this.app.use(express.urlencoded({ extended: true }));
    // esto convierte los datos JSON recibidos en un objeto JavaScript accesible a través de req.body
    this.app.use(express.json());
    this.app.use( '/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/alunos', alunoRoutes);
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/fotos', fotoRoutes);
  }
}


export default new App().app;
