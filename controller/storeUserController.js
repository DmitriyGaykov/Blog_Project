const User = require('./../models/User')

module.exports = async (req, res) => {
    try {
        await User.create(req.body)
        return res.redirect('/')
    } catch (error) {
        const validErrors = Object.keys(error.errors).map(key => error.errors[key].message)
        req.flash('validationErrors', validErrors)
        req.flash('reg-data', {...req.body})
        return res.redirect('/auth/register')
    }
}