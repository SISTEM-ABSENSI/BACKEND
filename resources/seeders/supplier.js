/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('suppliers', [
      {
        supplier_id: 1,
        supplier_name: 'Supplier A',
        supplier_contact: 'contact_a@example.com',
        created_at: new Date()
      },
      {
        supplier_id: 2,
        supplier_name: 'Supplier B',
        supplier_contact: 'contact_b@example.com',
        created_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('suppliers', null, {})
  }
}
