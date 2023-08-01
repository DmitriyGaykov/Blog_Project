const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
    try {
        const blogpost = await BlogPost.findById(req.params.id).populate('userId')

        if(blogpost == null) {
            res.redirect('/')
        }

        res.render('post', {
            blogpost
        })
    } catch (e) {
        console.warn(e)

        res.render('post', {
            blogpost: {}
        })
    }
}