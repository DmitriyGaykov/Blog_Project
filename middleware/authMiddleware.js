const User = require('./../models/User')

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId)

        if(user) {
            return next();
        }
    } catch (e) {
        console.warn(e)
    }

    return res.redirect('/')
}