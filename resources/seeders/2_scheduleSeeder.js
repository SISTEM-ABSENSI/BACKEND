/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('schedules', [
      {
        schedule_id: 1,
        schedule_name: 'Schedule Shift 1',
        schedule_description: 'Morning shift for SPG 1 at Store 1',
        schedule_store_id: 1,
        schedule_user_id: 1,
        schedule_start_date: new Date(),
        schedule_end_date: new Date(),
        schedule_status: 'waiting',
        created_at: new Date()
      },
      {
        schedule_id: 2,
        schedule_name: 'Schedule Shift 2',
        schedule_description: 'Afternoon shift for SPG 2 at Store 2',
        schedule_store_id: 2,
        schedule_user_id: 2,
        schedule_start_date: new Date(),
        schedule_end_date: new Date(),
        schedule_status: 'waiting',
        created_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('schedules', null, {})
  }
}
