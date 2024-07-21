'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories',
      [
        {
          id: 1,
          name: 'Iphone',
          description: 'Description',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'PC',
          description: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: 'Laptop',
          description: 'Description',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Categories', null, {});
  }
};