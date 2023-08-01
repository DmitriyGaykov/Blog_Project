module.exports = (req, res) => {
    const createError = req.flash('create-error')

    res.render('create', {
        errors: createError,
        createPost: true
    })
}