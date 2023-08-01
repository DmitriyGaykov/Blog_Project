module.exports = (req, res) => {
    const logError = req.flash('log-error')?.at(0)
    const logData = req.flash('log-data')?.at(0)

    res.render('login', {
        error: logError,
        username: logData?.username || "",
        password: logData?.password || ""
    })
}