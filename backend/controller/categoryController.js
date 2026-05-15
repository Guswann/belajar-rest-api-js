const { express } = require('express')
const Category = require('../model/CategoryModel')
const response = require('../utility/response')

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll()
        response(200, 'Data berhasil diambil', categories, res)

    } catch (error) {
        response(500, 'Gagal mengambil data', null, res)
    }
}

exports.createCategory = async (req, res) => {
    
}