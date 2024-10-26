/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stores', [
      {
        store_id: 1,
        store_name: 'Store A',
        store_longitude: '106.845599', // Example longitude
        store_latitude: '-6.208763', // Example latitude
        created_at: new Date()
      },
      {
        store_id: 2,
        store_name: 'Store B',
        store_longitude: '106.845601', // Example longitude
        store_latitude: '-6.208764', // Example latitude
        created_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stores', null, {})
  }
}
