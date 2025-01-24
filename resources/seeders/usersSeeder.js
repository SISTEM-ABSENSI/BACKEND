/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        user_id: 1,
        user_name: 'Joko',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a',
        user_role: 'user',
        user_contact: '_',
        user_device_id: '_'
      },
      {
        user_id: 2,
        user_name: 'admin',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a',
        user_role: 'admin',
        user_contact: '_',
        user_device_id: '_'
      },
      {
        user_id: 3,
        user_name: 'superAdmin',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a',
        user_role: 'superAdmin',
        user_contact: '_',
        user_device_id: '_'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
