const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

BlogPost.find({ title: /The/})
    .then(blogposts => console.log(blogposts))
    .catch(error => console.log(error))


BlogPost.find({  })
    .then(blogposts => console.log(blogposts))
    .catch(error => console.log(error))

BlogPost.find({ Title: "" })
    .then(blogposts => console.log(blogposts))
    .catch(error => console.log(error))

const id = "127747djfof"

BlogPost.findById({ id })
    .then(blogposts => console.log(blogposts))
    .catch(error => console.log(error))

BlogPost.findByIdAndUpdate(id, {title: ""})
    .then(blogpost => console.log(blogpost))
    .catch(error => console.log(error))