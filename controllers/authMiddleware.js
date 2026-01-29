module.exports.isAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect("/login");
        return;
    }
    next();
};

module.exports.isUnauth = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect("/");
        return;
    }
    next();
};
