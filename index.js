const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')

const app = new express();

app.set('view engine', 'ejs')

const PORT = 4000;

const validateMiddleware = require('./middleware/validateMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

app.use(express.static('public'))
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(expressSession({
    secret: 'keyboard cat'
}))

app.use('/posts/store', validateMiddleware)

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

const newPostController = require('./controller/newPost')
const homePageController = require('./controller/homePageController')
const aboutController = require('./controller/aboutController')
const contactController = require('./controller/contactController')
const postController = require('./controller/postController')
const storePostController = require('./controller/storePostController')
const newUserController = require('./controller/newUserController')
const storeUserController = require('./controller/storeUserController')
const loginController = require('./controller/loginController')
const userLoginController = require('./controller/userLoginController')

app.listen(PORT, () => {
    console.info("Server was started with a port " + PORT)
})

app.get('/', homePageController)
app.get('/about', aboutController)
app.get('/contact', contactController)
app.get('/post/:id', postController)
app.get('/posts/new', authMiddleware, newPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)

app.post('/posts/store', storePostController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, userLoginController)