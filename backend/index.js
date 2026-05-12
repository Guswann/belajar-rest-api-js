const express = require('express')
const app = express();
const port = 3000
const db = require('./connection')
const response = require('./response');

app.use(express.json())

// get all posts
app.get('/api/posts', (req, res) => {
    const sql = 'SELECT * FROM posts'

    db.query(sql, (error, result) => {
        console.log(result)
        response(200, 'Data berhasil diambil', result, res)

    })
})

// get single post by id
app.get('/api/posts/:id', (req, res) => {
    // Gunakan prepared statement untuk mencegah SQL Injection
    const sql = `SELECT * FROM posts WHERE id = ?`
    const postId = req.params.id;

    db.query(sql, [postId], (err, result) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Kesalahan server' });
        }
        if (result.length === 0) {
            return res.status(404).json({ status: 'fail', message: 'Post tidak ditemukan!' });
        }
        response(200, 'Data berhasil diambil', result[0], res)
    })
})

// Create New Post
app.post('/api/posts', (req, res) => {
    const { title, content, author } = req.body;
    const sql = `INSERT INTO posts (title, content, author) VALUES (?, ?, ?)`;
    const values = [title, content, author];

    // validasi
    if (!title || !content) {
        return res.status(400).json({
            status: 'error',
            message: 'Judul dan konten harus diisi'
        });
    }

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Gagal menyimpan data ke database' });
        }
        const newPost = {
            id: result.insertId,
            title,
            content,
            author
        };
        response(201, 'Post berhasil dibuat', newPost, res);
    });
});

// update post
app.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;
    console.log(req.body)

    const sql = `UPDATE posts SET title = ?, content = ?, author = ? WHERE id = ?`;
    const values = [title, content, author, id]

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Gagal update data' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'fail', message: 'Post tidak ditemukan!' });
        }

        const data = {
            id,
            title,
            content,
            author
        }
        response(200, 'Post Updated Successfully', data, res)
    })
})

// delete post

app.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM posts WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Gagal menghapus data' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'fail', message: 'Post tidak ditemukan!' });
        }

        response(200, 'Post berhasil dihapus', { id }, res);
    })
})

// app.delete('/api/posts/:id', (req, res) => {
//     const postId = req.params.id;
//     const sql = `DELETE FROM posts WHERE id = ?`;

//     db.query(sql, [postId], (err, result) => {
//         if (err) {
//             return res.status(500).json({ status: 'error', message: 'Gagal menghapus data' });
//         }
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ status: 'fail', message: 'Post tidak ditemukan!' });
//         }
//         res.json({
//             status: 'Success',
//             message: 'Post berhasil dihapus'
//         });
//     });
// });

app.post('/api/login', (req, res) => {
    console.log(req.body)
    res.send({
        status: 'Success',
        message: 'Login Berhasil'
    })
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/about', (req, res) => {
    res.json({ message: 'Hello World JSON' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})