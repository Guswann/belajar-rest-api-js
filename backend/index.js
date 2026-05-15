const express = require('express')
const app = express();
const port = 3000
const cors = require('cors')

app.use(cors())
app.use(express.json())

const categoryRoutes = require('./routes/categoryRoutes');
const postRoutes = require('./routes/postRoutes');
const Category = require('./model/CategoryModel');
const Post = require('./model/PostModel');
const db = require('./connection');

app.use('/categories', categoryRoutes)
app.use('/api/posts', postRoutes)

db.sync().then(() => {
    console.log('Database & tables created!')
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
})

// buat migrate fresh
// db.sync({ force: true }).then(() => {
//     console.log('Database & tables created!')
//     app.listen(port, () => {
//         console.log(`Example app listening on port ${port}`)
//     })
// })