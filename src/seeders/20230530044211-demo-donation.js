'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    
    await queryInterface.bulkInsert('Donations', [
      {
        campaignId: 1,
        userId: 1,
        amount: 100000,
        status: 'paid',
        deadline: new Date(),
        paidAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        campaignId: 1,
        userId: 1,
        amount: 100000,
        status: 'paid',
        deadline: new Date(),
        paidAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        campaignId: 1,
        userId: 1,
        amount: 100000,
        status: 'pending',
        deadline: new Date(),
        paidAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
