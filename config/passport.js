const passport = require('passport');
const { getUserByUsername, getUserById } = require('./db/queries');
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const verifyCallback = async  (username, password, done) => {
    const [user] = await getUserByUsername(username)
    if (!user) {
        return done(null, false);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return done(null, false);
    }

    return done(null, user)
}

const strategy = new localStrategy(verifyCallback);

passport.use(strategy)

passport.serializeUser((user, done) => {
    console.log('user SERI:', user)
    return done(null, user.id)
})

passport.deserializeUser( async (userId, done) => {
    const rows = await getUserById(+userId)
    const user = rows[0]

    console.log('user: in deserial', user)
    return done(null, user)
})