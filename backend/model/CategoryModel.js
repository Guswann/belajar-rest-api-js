const { Sequelize, DataTypes } = require("sequelize")
const db = require('../connection')

const Category = db.define('categories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true
})

module.exports = Category

