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
    try {
        const { name } = req.body

        if (!name) {
            return response(400, 'Nama kategori harus diisi', null, res)
        }

        const category = await Category.create({ name })
        response(201, 'Kategori berhasil dibuat', category, res)
    } catch (error) {
        console.log(error)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return response(400, 'Kategori dengan nama atau slug tersebut sudah ada', null, res)
        }
        response(500, 'Gagal membuat kategori', null, res)
    }
}