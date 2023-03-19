"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          login: "admin",
          password:
            "$2a$10$GO3JKPbtZkZvBFT4Q/rstuBLD0jtsn/TjOT9X94jLEQGf8g/ivvyq",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tasks",
      [
        {
          name: "John",
          email: "john@tut.by",
          text: "Create task",
          isDone: false,
          isChanged: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sandy",
          email: "sandy@tut.by",
          text: "Find a job",
          isDone: false,
          isChanged: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Tasks", null, {});
  },
};
