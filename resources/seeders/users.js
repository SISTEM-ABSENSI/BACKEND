/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        user_id: 1,
        user_name: 'user1',
        user_email: 'user1@mail.com',
        user_password: '91f284ea6cc6f77fb50743f8eb925e3d5e198a9a'
      },
      {
        user_id: 2,
        user_name: 'user2',
        user_email: 'user2@mail.com',
        user_password: '91f284ea6cc6f77fb50743f8eb925e3d5e198a9a'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
