import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
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
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        //En la siguiente linea se usa un objeto para validar los datos con validator.
        //El validator ya viene con el sequelize
        validate: {
          //En la siguiente linea se usa el objeto len atraves del validor para verificar la cantidad de caracateres del campo sobrenome.
          len: {
            args: [3, 255],
            msg: 'Campo sobrenome precisa ter entre 3 e 255 caracteres.',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        //En la siguiente linea se usa un objeto para validar los datos con validator.
        //El validator ya viene con el sequelize
        // unique sirve para establecer que ese campo no se puede repetir, para usarlo se tiene que habilitar a la hora de configurar la tabla en la base de datos.
        unique: {
          msg: 'Email já existe',
        },
        validate: {
          //En la siguiente linea se usa el objeto isEmail atraves del validor para verificar el campo email.
          isEmail: {
            msg: 'E-mail invalido.',
          },
        },
      },
      idade: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt:{
            msg: 'O campo idade precisa ser um numero inteiro.'
          }
        },
      },
      peso: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isNumeric:{
            msg: 'O campo peso precisa ser um numero.'
          }
        },
      },
      altura: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isNumeric:{
            msg: 'O campo altura precisa ser um numero'
          }
        },
      },
    },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: 'aluno_id' }) //aqui se asocian las tablas, se asocia el aluno a la foto y se dice que un aluno tiene muchas fotos
  }
}
