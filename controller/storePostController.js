const path = require('path');
const BlogPost = require("../models/BlogPost");
const User= require('./../models/User')

module.exports = async (req, res) => {
    try {
        const image = req.files?.image;

        if(image != null)
            await image?.mv(path.resolve(__dirname, '../public/assets/img/blogs', image?.name))


        try {
            await BlogPost.create({
                ...req.body,
                image: image ? ('/assets/img/blogs/' + image.name) : undefined,
                userId: req.session.userId
            })
            return res.redirect('/')
        } catch (create_error) {
            const createErrors = Object.keys(create_error.errors)?.map(key => create_error.errors[key].message)
            req.flash('create-error', createErrors)

            return res.redirect('/posts/new');
        }
    } catch (e) {
        console.log(e)
        return res.redirect('/posts/new');
    }
}