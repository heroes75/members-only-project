function logoutController(req, res, next) {
    req.logout((err) => {
        if (err) {
            console.error(err)
        }
    })
    res.redirect('/')
}

module.exports = logoutController