/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('toko', [
      {
        toko_id: 1,
        toko_name: 'Toko A',
        toko_longitude: '106.845599', // Example longitude
        toko_latitude: '-6.208763', // Example latitude
        created_at: new Date()
      },
      {
        toko_id: 2,
        toko_name: 'Toko B',
        toko_longitude: '106.845601', // Example longitude
        toko_latitude: '-6.208764', // Example latitude
        created_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('toko', null, {})
  }
}
