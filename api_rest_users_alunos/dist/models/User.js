"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        //En la siguiente linea se usa un objeto para validar los datos con validator.
        //El validator ya viene con el sequelize
        validate: {
          //En la siguiente linea se usa el objeto len atraves del validor para verificar la cantidad de caracateres del campo nome.
          len: {
            args: [3, 255],
            msg: 'Campo nome precisa ter entre 3 e 255 caracteres.',
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já existe',
        },
        //En la siguiente linea se usa un objeto para validar los datos con validator.
        //El validator ya viene con el sequelize
        validate: {
          //En la siguiente linea se usa el objeto isEmail atraves del validor para verificar si el eamil del cliente es valido.
          isEmail: {
            msg: 'Precisa ser um email valido.'
          },
        },
      },
      password_hash: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      password: {
        type: _sequelize2.default.VIRTUAL,
        defaultValue: '',
        //En la siguiente linea se usa un objeto para validar los datos con validator.
        //El validator ya viene con el sequelize
        validate: {
          //En la siguiente linea se usa el objeto len atraves del validor para verificar la cantidad de caracateres del campo senha.
          len: {
            args: [6, 50],
            msg: 'A senha precisa ter entre 6 e 50 caracteres.',
          },
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async user => {
      if(user.password) user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
    })

    return this;
  }

  passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
} exports.default = User;
