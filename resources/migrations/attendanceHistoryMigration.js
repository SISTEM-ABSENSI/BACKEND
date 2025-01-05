/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attendance_histories', {
      ...ZygoteModel,
      attendance_history_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      attendance_history_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      attendance_history_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      attendance_history_category: {
        type: Sequelize.ENUM('checkin', 'checkout', 'outside'),
        allowNull: false
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('attendance_histories')
  }
}
