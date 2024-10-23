/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jadwal', {
      ...ZygoteModel, // Common attributes from ZygoteModel
      jadwal_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      jadwal_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      jadwal_description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      jadwal_toko_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'toko',
          key: 'toko_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      jadwal_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      jadwal_start_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      jadwal_end_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      jadwal_status: {
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
    await queryInterface.dropTable('jadwal')
  }
}
