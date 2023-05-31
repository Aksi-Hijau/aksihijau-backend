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
    await queryInterface.bulkInsert('Users', [{
      uuid: 'd3a3b2c1-5f5f-4c4c-9b9b-8a8a7a7a6b6b',
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'johndoe123',
      photo: 'https://via.placeholder.com/640x480.png/00ff00?text=John+Doe',
      birthDate: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
      role: 'user',
      createdAt: now,
      updatedAt: now,
    }], {});
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
