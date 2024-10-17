'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('toko', [
      {
        toko_id: 1,
        toko_name: 'Toko A',
        toko_position: 'Posisi 1',
        created_at: new Date()
      },
      {
        toko_id: 2,
        toko_name: 'Toko B',
        toko_position: 'Posisi 2',
        created_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('toko', null, {})
  }
}
