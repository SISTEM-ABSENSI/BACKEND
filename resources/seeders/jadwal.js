'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('jadwal', [
      {
        jadwal_id: 1,
        toko_id: 1,
        spg_id: 1,
        date: new Date(),
        check_in: new Date(),
        check_out: new Date(),
        created_at: new Date()
      },
      {
        jadwal_id: 2,
        toko_id: 2,
        spg_id: 2,
        date: new Date(),
        check_in: new Date(),
        check_out: new Date(),
        created_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('jadwal', null, {})
  }
}
