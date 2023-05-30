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

    const now = new Date();
    await queryInterface.bulkInsert('Campaigns', [
      {
        userId: 1,
        soilId: 1,
        title: 'Kampanye 1',
        slug: 'kampanye-1',
        image: 'https://via.placeholder.com/640x480.png/00ff00?text=Kampanye+1',
        target: 1000000,
        description: 'Deskripsi kampanye 1',
        deadline: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
        createdAt: now,
        updatedAt: now,
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
