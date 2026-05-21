const Users = require("../model/UserModel");
const response = require("../utility/response");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { name, email, password } = req.body

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)

    try {
        const user = await Users.create({
            name,
            email,
            password: hashPassword
        })
        response(201, 'Register success', user, res)
    } catch (error) {
        console.log(error)
        response(500, 'Register Failed', null, res)
    }
}

exports.login = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!user) {
            return response(404, 'User Not Found', null, res)
        }

        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) {
            return response(400, 'Wrong Password', null, res)
        }

        const userId = user.id
        const name = user.name
        const email = user.email
        const accessToken = jwt.sign({ userId, name, email }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        return response(200, 'Login Success', { accessToken }, res)

    } catch (error) {
        return response(500, 'Login Failed', null, res)
    }
}

exports.logout = async (req, res) => {
    try {
        return response(200, 'Logout Success', null, res)
    } catch (error) {
        return response(500, 'Logout Failed', null, res)
    }
}