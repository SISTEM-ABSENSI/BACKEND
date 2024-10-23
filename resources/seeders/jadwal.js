/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('jadwal', [
      {
        jadwal_id: 1,
        jadwal_name: 'Jadwal Shift 1',
        jadwal_description: 'Shift pagi untuk SPG 1 di Toko 1',
        jadwal_toko_id: 1,
        jadwal_user_id: 1,
        jadwal_start_date: new Date(),
        jadwal_end_date: new Date(),
        jadwal_status: 'waiting',
        created_at: new Date()
      },
      {
        jadwal_id: 2,
        jadwal_name: 'Jadwal Shift 2',
        jadwal_description: 'Shift siang untuk SPG 2 di Toko 2',
        jadwal_toko_id: 2,
        jadwal_user_id: 2,
        jadwal_start_date: new Date(),
        jadwal_end_date: new Date(),
        jadwal_status: 'waiting',
        created_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('jadwal', null, {})
  }
}
