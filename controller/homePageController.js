const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
    // res.sendFile('pages/index.html')
    try {
        const blogposts = await BlogPost.find({}).populate('userId');

        res.render("index", {
            blogposts: [...blogposts]
        });
    } catch (e) {
        console.warn(e)

        res.render('index', {
            blogposts : []
        })
    }
}