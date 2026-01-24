const { matchedData, validationResult, body } = require('express-validator')
const { createUser } = require('../config/db/queries')
const bcrypt = require('bcryptjs')


const signUpConstraint = [
    body('firstname')
        .trim()
        .notEmpty().withMessage('first name is not empty')
        .isAlpha().withMessage('first name must contain only letters'),
    body('lastname')
        .trim()
        .notEmpty().withMessage('last name is not empty')
        .isAlpha().withMessage('last name must contain only letters'),
    body('username')
        .trim()
        .notEmpty().withMessage('username is not empty')
        .isAlphanumeric().withMessage('username must be alphanumeric'),
    body('password')
        .trim()
        .notEmpty().withMessage('password is not empty')
        .isLength({min: 5}).withMessage('password must have 5 character at least')
        .custom(value => {
            return /[A-Z]/.test(value)
        }).withMessage('password must contain Uppercase letter')
        .custom(value => {
            return /[0-9]/.test(value)
        }).withMessage('password must contain at least one number')
        .custom(value => {
            return /\W/.test(value)
        }).withMessage('password must contain a no alphanumeric character'),
    body('confirmPassword')
        .custom((value, {req}) => {
            return value === req.body.password
        }).withMessage('your passwords must be identic'),

]
function displaySignUpPage(req, res, next) {
    res.render('signUpPage')
}

async function signUpController(req, res, next) {
    const errors = validationResult(req)
    console.log('errors:', errors)
    if (!errors.isEmpty()) {
        res.render('signUpPage', {errors: errors.errors})
        return
    }
    const { firstname, lastname, username, password, confirmPassword } = matchedData(req);
    const hashPassword = await  bcrypt.hash(password, 10)
    console.log('hashPassword:', hashPassword)
    await createUser({firstname, lastname, username, hashPassword})
    res.redirect('/login')
}

module.exports = {
    displaySignUpPage,
    signUpController,
    signUpConstraint,
    
}