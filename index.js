const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')

const app = new express();

app.set('view engine', 'ejs')

const PORT = 4000;

const validateMiddleware = require('./middleware/validateMiddleware')

app.use(express.static('public'))
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use('/posts/store', validateMiddleware)

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

const newPostController = require('./controller/newPost')
const homePageController = require('./controller/homePageController')
const aboutController = require('./controller/aboutController')
const contactController = require('./controller/contactController')
const postController = require('./controller/postController')
const storePostController = require('./controller/storePostController')

app.listen(PORT, () => {
    console.log("Server was started with a port " + PORT)
})

app.get('/', homePageController)
app.get('/about', aboutController)
app.get('/contact', contactController)
app.get('/post/:id', postController)
app.get('/posts/new', newPostController)

app.post('/posts/store', storePostController)