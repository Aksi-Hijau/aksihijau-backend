'use strict';

/** @method {import('sequelize-cli').Migration} */
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

    await queryInterface.bulkInsert('Payments', [
      {
        type: "bank",
        method: 'bni',
        name: 'Bank BNI',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/BNI_logo.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "bank",
        method: 'bca',
        name: 'Bank BCA',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/BCA_logo.svg/1200px-BCA_logo.svg.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "bank",
        method: 'bri',
        name: 'Bank BRI',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/BRI_logo.svg/1200px-BRI_logo.svg.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "ewallet",
        method: 'gopay',
        name: 'Gopay',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/GoPay_Logo.svg/1200px-GoPay_Logo.svg.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
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
