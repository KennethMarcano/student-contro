//importaciones de librerias de node
import dotenv from 'dotenv'; //se debe instalar el dontenv por el terminal
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
  'http://35.199.67.52:81',
  'http://35.199.67.52:3003',
  'http://35.199.67.52:3000',
  'http://35.199.67.52',
  'http://localhost:3003',
  'http://localhost:3000',
  'http://localhost:3306',
  'http://localhost:81',
  'http://localhost:82',
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
    this.app.use(express.urlencoded({ extended: true }));
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
