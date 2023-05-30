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

    await queryInterface.bulkInsert('Soil', [
      {
        type: 'Sandy',
        image: 'https://images.unsplash.com/photo-1581093455538-4a5b8fdd3c5d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FuZHklMjBzb2lsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
        body: 'Sandy soil is composed of many irregular to rounded tiny grains of sand. These grains can be seen with our naked eyes. Sandy soil is also known as “Light soil”. Generally, sandy soil is composed of- 35% sand and less than 15% silt and clay. Primarily sand is the small pieces of eroded rocks with a gritty texture. In sandy soil, most of the soil particulars are bigger than 2mm in diameter. Uses of Sandy Soil: Sandy soil is ideal for crops such as watermelons, peaches, and peanuts, and its water drainage properties also make it useful for crops that are prone to root rot. Sandy soil is also ideal for many types of vegetables, herbs, and ornamental plants too.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Clay',
        image: 'https://www.gardeningknowhow.com/wp-content/uploads/2019/05/clay-soil.jpg',
        body: 'Clay soil is composed of tiny particles that are hard and able to become easily compacted. This compaction makes it difficult to plant or even shovel within the soil. Clay soil can feel like a curse to gardeners and can be difficult to plant, shovel or till. But there are actually some vegetables that will do well with this type of soil. Uses of Clay Soil: Clay soil is used in making ceramics, bricks, and tiles. It is also used in construction, filtration systems, and in sealing oil wells. Clay soil is rich in nutrients and holds water well, making it ideal for agriculture. It is also used in many cosmetics and skin care products.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Silty',
        image: 'https://www.gardeningknowhow.com/wp-content/uploads/2019/05/silty-soil.jpg',
        body: 'Silty soil is composed of clay, sand, and silt and is very fertile. It has more nutrients than sandy soil and has better drainage than clay. Silty soil is one of the best for growing crops. Uses of Silty Soil: Silty soil is used in making bricks, tiles, and ceramics. It is also used in construction, filtration systems, and in sealing oil wells. Silty soil is rich in nutrients and holds water well, making it ideal for agriculture. It is also used in many cosmetics and skin care products.',
        createdAt: new Date(),
        updatedAt: new Date()
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
    await queryInterface.bulkDelete('Soils', null, {});
  }
};
