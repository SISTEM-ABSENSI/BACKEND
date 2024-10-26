/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('schedules', {
      ...ZygoteModel, // Common attributes from ZygoteModel
      schedule_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      schedule_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      schedule_description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      schedule_store_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'store', // Update this to match the new store table name
          key: 'store_id' // Update this to match the new store primary key
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      schedule_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      schedule_start_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      schedule_end_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      schedule_status: {
        type: Sequelize.ENUM('waiting', 'checkin', 'checkout'),
        allowNull: true,
        defaultValue: 'waiting'
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('schedules')
  }
}
