import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
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
      if(user.password) user.password_hash = await bcryptjs.hash(user.password, 8);
    })

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
