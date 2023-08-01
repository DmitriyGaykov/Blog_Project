module.exports = (req, res) => {
    const regData = req.flash('reg-data')?.at(0)

    res.render('register', {
        errors: req.flash('validationErrors'),
        username: regData?.username,
        password: regData?.password
    })
}