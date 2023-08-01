const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const flash = require('connect-flash')
require('dotenv').config()

const app = new express();

app.set('view engine', 'ejs')

const PORT = process.env.PORT || 4000;

// const validateMiddleware = require('./middleware/validateMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

global.loggedIn = null // A global variable that is visible all ejs files

app.use(express.static('public'))
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(expressSession({
    secret: 'keyboard cat'
}))
app.use(flash())
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId
    next()
})

const stringConnection =  process.env.MONGO_URL.replace('<username>', process.env.DB_USERNAME)
                                               .replace('<password>', process.env.DB_PASSWORD)
mongoose.connect(stringConnection, {useNewUrlParser: true}).then(() => {
    console.log('Connected to MongoDB')
})

const newPostController = require('./controller/newPostController')
const homePageController = require('./controller/homePageController')
const aboutController = require('./controller/aboutController')
const contactController = require('./controller/contactController')
const postController = require('./controller/postController')
const storePostController = require('./controller/storePostController')
const newUserController = require('./controller/newUserController')
const storeUserController = require('./controller/storeUserController')
const loginController = require('./controller/loginController')
const userLoginController = require('./controller/userLoginController')
const logoutController = require('./controller/logoutController')
const notfoundController = require('./controller/notfoundController')

app.get('/', homePageController)
app.get('/about', aboutController)
app.get('/contact', contactController)
app.get('/post/:id', postController)
app.get('/posts/new', authMiddleware, newPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.get('/auth/logout', logoutController)

app.post('/posts/store', storePostController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, userLoginController)

app.use(notfoundController)

app.listen(PORT, () => {
    console.info("Server was started with a port " + PORT)
})