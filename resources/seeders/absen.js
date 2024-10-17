'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('absen', [
      {
        absen_id: 1,
        spg_id: 1,
        toko_id: 1,
        position: 'Manager',
        check_in: new Date(),
        check_out: new Date(),
        created_at: new Date()
      },
      {
        absen_id: 2,
        spg_id: 2,
        toko_id: 2,
        position: 'Staff',
        check_in: new Date(),
        check_out: new Date(),
        created_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('absen', null, {})
  }
}
