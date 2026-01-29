function displayLoginPage(req, res) {
    res.render("loginPage");
}

function loginController(req, res, next) {
    console.log("req.session in login:", req.session);
    console.log("req.user in login:", req.user);
    console.log("req.user in login:", req.authenticated);
    next();
}

module.exports = {
    displayLoginPage,
    loginController,
};
