require("dotenv").config();
require("./config/passport");
const express = require("express");
const indexRouter = require("./routes/index-router");
const path = require("node:path");
const signUpRouter = require("./routes/sign-up-router");
const loginRouter = require("./routes/login-router");
const session = require("express-session");
const pool = require("./config/db/pool");
const passport = require("passport");
const logoutRouter = require("./routes/logout-router");
const joinTheClubRouter = require("./routes/join-the-club-router");
const createMessageRouter = require("./routes/create-message-router");
const becomeAdminRouter = require("./routes/become-admin-router");
const { isAuth, isUnauth } = require("./controllers/authMiddleware");
const pgSession = require("connect-pg-simple")(session);

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        store: new pgSession({
            pool: pool,
            tableName: "session",
        }),
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000,
        },
    }),
);
app.use(passport.session());
app.use((req, res, next) => {
    console.log("req.session:", req.session);
    console.log("req.user:", req.user);
    if (req.user) {
        res.locals.currentUser = req.user;
    }
    next();
});

app.use(indexRouter);
app.use(["/signup", "/register"], isUnauth, signUpRouter);
app.use("/login", isUnauth, loginRouter);
app.use("/logout", logoutRouter);
app.use("/join", isAuth, joinTheClubRouter);
app.use(
    ["/createmessage", "/postmessage", "/post", "/create"],
    isAuth,
    createMessageRouter,
);
app.use(["/becomeAdmin", "/admin"], isAuth, becomeAdminRouter);

app.listen(process.env.PORT, (err) => {
    if (err) console.error(err);
    console.log(`listen at url localhost:3000`);
});
