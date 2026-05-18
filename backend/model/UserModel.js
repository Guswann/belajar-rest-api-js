const { Sequelize } = require("sequelize");
const db = require("../connection");
const { DataTypes } = Sequelize


const Users = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Email tidak boleh kembar
        validate: {
            isEmail: true // Validasi format email
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    freezeTableName: true
})

module.exports = Users
