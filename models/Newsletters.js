'use strict';

module.exports = (sequelize, DataTypes) => {
    var Newsletters = sequelize.define('Newsletters', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        template: {
            allowNull: false,
            type: DataTypes.INTEGER
        },

        image_1: {
            allowNull: false,
            type: DataTypes.STRING
        },
        title_1: {
            allowNull: false,
            type: DataTypes.STRING
        },
        abstract_1: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        link_1: {
            allowNull: false,
            type: DataTypes.TEXT
        },

        image_2: {
            allowNull: true,
            type: DataTypes.STRING
        },
        title_2: {
            allowNull: true,
            type: DataTypes.STRING
        },
        abstract_2: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        link_2: {
            allowNull: true,
            type: DataTypes.TEXT
        },

        image_3: {
            allowNull: true,
            type: DataTypes.STRING
        },
        title_3: {
            allowNull: true,
            type: DataTypes.STRING
        },
        abstract_3: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        link_3: {
            allowNull: true,
            type: DataTypes.TEXT
        }
    });

    return Newsletters;
}