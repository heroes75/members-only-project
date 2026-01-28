const { body, validationResult } = require("express-validator");
const { updateAdminStatus } = require("../config/db/queries");

exports.displayBecomeAdminForm = (req, res) => {
    res.render('becomeAdminForm');
}

const validAdminCode = [
    body('adminCode')
        .trim()
        .matches(process.env.ADMIN_CODE).withMessage('wrong code. hint: most beautiful woman in the world')
]

exports.becomeAdminController = [
    validAdminCode,
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render('becomeAdminForm', {errors: errors.errors})
            return
        }
        await updateAdminStatus(req.user.id)
        res.redirect('/admin')
    }
]

