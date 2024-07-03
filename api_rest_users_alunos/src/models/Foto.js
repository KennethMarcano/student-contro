import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class Foto extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        //En la siguiente linea se usa un objeto para validar los datos con validator.
        //El validator ya viene con el sequelize
        validate: {
          notEmpty: {
            msg: 'Campo nao pode ficar vazio.',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        //En la siguiente linea se usa un objeto para validar los datos con validator.
        //El validator ya viene con el sequelize
        validate: {
          notEmpty: {
            msg: 'Campo nao pode ficar vazio.',
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`
        },
      }
    },
      {
        sequelize,
        tableName: 'fotos',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' }) //aqui se asocian las tablas, se asocia la foto al aluno
  }
}
