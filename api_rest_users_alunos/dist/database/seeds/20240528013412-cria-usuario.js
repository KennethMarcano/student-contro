"use strict";const bcryptjs = require('bcryptjs');

module.exports = {
  async up(queryInterface) {

    queryInterface.bulkInsert(
      'users',
      [
        {
          nome: 'kenneth',
          email: 'kenneth1@gmail.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'kenneth2',
          email: 'kenneth2@gmail.com',
          password_hash: await bcryptjs.hash('654321', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'kenneth3',
          email: 'kenneth3@gmail.com',
          password_hash: await bcryptjs.hash('10203040', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
  }
};
