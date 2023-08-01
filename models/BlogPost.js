const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Provide a title of blog!']
    },
    body: {
        type: String,
        unique: [true, "This blog body is already exist!"],
        required: [true, 'Provide a body of blog!']
    },
    // userName: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: {
        type: String,
        default: '/assets/img/default.jpg'
    }
})

BlogPostSchema.plugin(uniqueValidator)

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
module.exports = BlogPost