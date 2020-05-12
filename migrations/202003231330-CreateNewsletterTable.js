'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Newsletters', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUID,
                allowNull: false,
                primaryKey: true
            },
            template: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            }, 
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }, 

            image_1: {
                allowNull: false,
                type: Sequelize.STRING
            },
            title_1: {
                allowNull: false,
                type: Sequelize.STRING
            },
            abstract_1: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            link_1: {
                allowNull: false,
                type: Sequelize.TEXT
            },

            image_2: {
                allowNull: true,
                type: Sequelize.STRING
            },
            title_2: {
                allowNull: true,
                type: Sequelize.STRING
            },
            abstract_2: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            link_2: {
                allowNull: true,
                type: Sequelize.TEXT
            },

            image_3: {
                allowNull: true,
                type: Sequelize.STRING
            },
            title_3: {
                allowNull: true,
                type: Sequelize.STRING
            },
            abstract_3: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            link_3: {
                allowNull: true,
                type: Sequelize.TEXT
            }, 
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Newsletters');
    }
};