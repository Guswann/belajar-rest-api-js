const Category = require('../model/CategoryModel')
const response = require('../utility/response')

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll()
        response(200, 'Data retrieved successfully', categories, res)

    } catch (error) {
        response(500, 'Failed retrieved data', null, res)
    }
}


exports.showCategory = async (req, res) => {
    try {
        const { id } = req.params
        const category = await Category.findByPk(id)

        if (!category) {
            return response(404, 'Category Not Found', null, res)
        }

        response(200, 'Data Retrieved successfully', category, res)
    } catch (error) {
        console.log(error)
        response(500, 'Failed to retrieve data', null, res)
    }

}

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body

        if (!name) {
            return response(400, 'Category Name is required', null, res)
        }

        const category = await Category.create({ name })
        response(201, 'Category Created Successfully', category, res)
    } catch (error) {
        console.log(error)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return response(400, 'Category Name must be unique', null, res)
        }
        response(500, 'Gagal membuat kategori', null, res)
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const category = await Category.findByPk(id)

        if (!category) {
            return response(404, 'Category Not Found', null, res)
        }

        await category.update({
            name
        })

        response(200, "Category Updated Successfully", category, res)

    } catch (error) {
        response(500, "Update failed", null, res)
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        const category = await Category.findByPk(id)

        if (!category) {
            return response(404, 'Category Not Found', null, res)
        }

        await category.destroy()
        response(200, 'Category Deleted Successfully', { id }, res)
    } catch (error) {
        response(500, 'Failed to delete category', error, res)
    }
}
