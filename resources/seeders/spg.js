'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('spg', [
      {
        spg_id: 1,
        spg_name: 'John Doe',
        spg_device_id: 'device_001',
        spg_contact: '1234567890',
        spg_supplier_id: 1,
        spg_password: 'password123',
        created_at: new Date()
      },
      {
        spg_id: 2,
        spg_name: 'Jane Doe',
        spg_device_id: 'device_002',
        spg_contact: '0987654321',
        spg_supplier_id: 2,
        spg_password: 'password456',
        created_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('spg', null, {})
  }
}
