const bcrypt = require('bcrypt')
const User = require('./../models/User')

module.exports = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await User.findOne({
            username: username
        })

        if(user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if(error) {
                    console.warn(error)
                }
                if(same) {
                    req.session.userId = user._id
                    return res.redirect('/')
                } else {
                    isWrong(req, res)
                }
            })
        } else {
            isWrong(req, res)
        }
    } catch (e) {
        isWrong(req, res)
    }
}

const isWrong = (req, res) => {
    req.flash('log-data', {...req.body})
    req.flash('log-error', true)
    res.redirect('/auth/login')
}