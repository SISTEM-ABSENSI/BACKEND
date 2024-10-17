/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('spg', {
      ...ZygoteModel,
      spg_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      spg_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      spg_device_id: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      spg_contact: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      spg_supplier_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      spg_password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('spg')
  }
}
