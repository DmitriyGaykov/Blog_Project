const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
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
}