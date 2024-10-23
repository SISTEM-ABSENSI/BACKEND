/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        user_id: 1,
        user_name: 'spg1',
        user_email: 'spg@mail.com',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a',
        user_role: 'spg'
      },
      {
        user_id: 2,
        user_name: 'admin',
        user_email: 'admin@mail.com',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a',
        user_role: 'admin'
      },
      {
        user_id: 3,
        user_name: 'supplier',
        user_email: 'supplier@mail.com',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a',
        user_role: 'supplier'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
