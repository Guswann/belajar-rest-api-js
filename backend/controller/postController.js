const Post = require('../model/PostModel')
const response = require('../utility/response')

// get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll()
        response(200, 'Data berhasil diambil', posts, res)
    } catch (error) {
        console.log(error)
        response(500, 'Gagal mengambil data', null, res)
    }
}

// get single post by id
exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findByPk(id)

        if (!post) {
            return response(404, 'Post tidak ditemukan!', null, res)
        }

        response(200, 'Data berhasil diambil', post, res)
    } catch (error) {
        response(500, 'Kesalahan server', null, res)
    }
}

// create new post
exports.createPost = async (req, res) => {
    try {
        const { title, content, author } = req.body

        // validasi
        if (!title || !content) {
            return response(400, 'Judul dan konten harus diisi', null, res)
        }

        const post = await Post.create({
            title,
            content,
            author
        })

        response(201, 'Post berhasil dibuat', post, res)
    } catch (error) {
        response(500, 'Gagal menyimpan data ke database', null, res)
    }
}

// update post
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const { title, content, author } = req.body

        const post = await Post.findByPk(id)

        if (!post) {
            return response(404, 'Post tidak ditemukan!', null, res)
        }

        await post.update({
            title,
            content,
            author
        })

        response(200, 'Post berhasil diupdate', post, res)
    } catch (error) {
        response(500, 'Gagal update data', null, res)
    }
}

// delete post
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params

        const post = await Post.findByPk(id)

        if (!post) {
            return response(404, 'Post tidak ditemukan!', null, res)
        }

        await post.destroy()

        response(200, 'Post berhasil dihapus', { id }, res)
    } catch (error) {
        response(500, 'Gagal menghapus data', null, res)
    }
}
