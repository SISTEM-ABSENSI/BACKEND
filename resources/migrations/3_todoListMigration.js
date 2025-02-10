/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('todo_lists', {
      ...ZygoteModel,
      todo_list_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      todo_list_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      todo_list_schedule_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'schedules',
          key: 'schedule_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      todo_list_status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('todo_lists')
  }
}
