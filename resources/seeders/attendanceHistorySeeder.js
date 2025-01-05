/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('attendance_histories', [
      {
        attendance_history_id: 1,
        attendance_history_user_id: 101,
        attendance_history_time: '2024-12-24 08:00:00',
        attendance_history_category: 'checkin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        attendance_history_id: 2,
        attendance_history_user_id: 102,
        attendance_history_time: '2024-12-24 17:00:00',
        attendance_history_category: 'checkout',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        attendance_history_id: 3,
        attendance_history_user_id: 103,
        attendance_history_time: '2024-12-24 12:30:00',
        attendance_history_category: 'outside',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('attendance_histories', null, {})
  }
}
