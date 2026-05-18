const { Sequelize, DataTypes } = require("sequelize")
const db = require('../connection')

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
}

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
    timestamps: true,
    hooks: {
        beforeValidate: (category) => {
            if (category.name) {
                category.slug = slugify(category.name)
            }
        }
    }
})

module.exports = Category

