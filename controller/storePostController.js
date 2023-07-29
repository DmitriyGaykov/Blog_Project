const path = require('path');
const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
    try {
        const image = req.files.image;

        try {
            await image.mv(path.resolve(__dirname, 'public/assets/img/blogs', image.name))
        } catch (e) {
            console.warn(e)
        } finally {
            await BlogPost.create({
                ...req.body,
                image: '/assets/img/blogs/' + image.name
            })
        }
    } catch (e) {
        console.warn(e)
    }

    res.redirect('/')
}