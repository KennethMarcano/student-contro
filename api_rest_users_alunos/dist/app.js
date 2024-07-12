"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//importaciones de librerias de node
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv); //se debe instalar el dontenv por el terminal
var _path = require('path');
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _expressdelay = require('express-delay'); var _expressdelay2 = _interopRequireDefault(_expressdelay);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);

_dotenv2.default.config()

//importaciones locales
require('./database');
var _homeRoutes = require('./routes/homeRoutes'); var _homeRoutes2 = _interopRequireDefault(_homeRoutes);
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _alunoRoutes = require('./routes/alunoRoutes'); var _alunoRoutes2 = _interopRequireDefault(_alunoRoutes);
var _fotoRoutes = require('./routes/fotoRoutes'); var _fotoRoutes2 = _interopRequireDefault(_fotoRoutes);

const whiteList = [
  'http://35.199.67.52:82'
]

const corsOptions = {
  origin: function(origin, callback) {
    if(whiteList.indexOf(origin) !== -1 || !origin) return callback(null, true);
    else return callback(new Error('Not allowed by CORS'));
  }
}

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(_cors2.default.call(void 0, corsOptions)); //aqui se restringe los accesos solo para las url de la whitelist
    this.app.use(_helmet2.default.call(void 0, {
      crossOriginEmbedderPolicy: false,
    }));
    this.app.use(_expressdelay2.default.call(void 0, 500));
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use( '/images/', _express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', _homeRoutes2.default);
    this.app.use('/users', _userRoutes2.default);
    this.app.use('/alunos', _alunoRoutes2.default);
    this.app.use('/tokens', _tokenRoutes2.default);
    this.app.use('/fotos', _fotoRoutes2.default);
  }
}


exports. default = new App().app;
