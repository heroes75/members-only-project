const { body, validationResult, matchedData } = require("express-validator")
const { updateMembership } = require("../config/db/queries")

 exports.displayJoinTheClubPage = function displayJoinTheClubPage(req, res, next) {
    res.render('joinTheClub')
}

const validJoinTheClubCode = [
    body('joinCode')
        .matches(process.env.MEMBERSHIP_CODE).withMessage('Wrong code')
]

exports.joinTheClubController = [
    validJoinTheClubCode,
    async (req, res) => {
        console.log('process.env.MEMBERSHIP_CODE:', process.env.MEMBERSHIP_CODE)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render('joinTheClub', { errors: errors.errors })
            return
        }
        await updateMembership(req.user.id)
        res.redirect('/join')
    }
]