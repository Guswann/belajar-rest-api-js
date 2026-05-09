const express = require('express')
const app = express();
const port = 3000

app.use(express.json())

let posts = [
    { id: 1, title: 'Belajar Express', content: 'Express itu mudah dan cepat!' },
    { id: 2, title: 'Hari Ini', content: 'Cuaca cerah sekali di Jakarta.' }
]

// get all posts
app.get('/api/posts', (req, res) => {
    res.json({
        status: 'success',
        data: posts
    })
})

// create new post
app.post('/api/posts', (req, res) => {
    const { title, content } = req.body

    if (!title || !content) {
        return res.status(400).json({
            status: 'error',
            message: 'Title dan content harus diisi'
        })
    }

    const newPost = {
        id: posts.length + 1,
        title,
        content
    }

    posts.push(newPost)
    res.status(201).json({
        status: 'success',
        data: newPost
    })
})

app.put('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;

    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Post tidak ditemukan!'
        });
    }

    // Update data
    posts[postIndex] = {
        ...posts[postIndex],
        title: title || posts[postIndex].title,
        content: content || posts[postIndex].content
    };

    res.json({
        status: 'success',
        data: posts[postIndex]
    });
});


app.delete('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Post tidak ditemukan!'
        });
    }

    // Hapus data dari array
    const deletedPost = posts.splice(postIndex, 1);

    res.json({
        status: 'success',
        message: 'Post berhasil dihapus',
        data: deletedPost[0]
    });
});



app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/about', (req, res) => {
    res.json({ message: 'Hello World JSON' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})