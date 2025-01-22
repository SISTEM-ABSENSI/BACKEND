/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      ...ZygoteModel,
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      user_name: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      user_password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_contact: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_device_id: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '_'
      },
      user_role: {
        type: Sequelize.ENUM('admin', 'superAdmin', 'user'),
        allowNull: false,
        defaultValue: 'user'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
}
