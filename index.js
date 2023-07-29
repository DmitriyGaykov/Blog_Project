const express = require('express')
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')

const BlogPost = require('./models/BlogPost')

const app = new express();

app.set('view engine', 'ejs')

const PORT = 4000;

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(fileUpload())

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

app.listen(PORT, () => {
    console.log("Server was started with a port " + PORT)
})

app.get('/', async (req, res) => {
    // res.sendFile('pages/index.html')
    try {
        const blogposts = await BlogPost.find({});

        res.render("index", {
            blogposts: [...blogposts]
        });
    } catch (e) {
        console.warn(e)

        res.render('index', {
            blogposts : []
        })
    }
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post/:id', async (req, res) => {
    try {
        const blogpost = await BlogPost.findById(req.params.id)

        res.render('post', {
            blogpost
        })
    } catch (e) {
        console.warn(e)

        res.render('post', {
            blogpost: {}
        })
    }
})

app.get('/posts/new', (req, res) => {
    res.render('create');
})

app.post('/posts/store', async (req, res) => {
    try {
        const image = req.files.image;

        try {
            await image.mv(path.resolve(__dirname, 'public/assets/img/blogs', image.name))
        } catch (e) {
            console.warn(e)
        }

        await BlogPost.create(req.body)
    } catch (e) {
        console.warn(e)
    }

    res.redirect('/')
})