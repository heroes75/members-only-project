const { body, validationResult } = require("express-validator");
const { updateMembership } = require("../config/db/queries");

exports.displayJoinTheClubPage = function displayJoinTheClubPage(req, res) {
    res.render("joinTheClub");
};

const validJoinTheClubCode = [
    body("joinCode")
        .matches(process.env.MEMBERSHIP_CODE)
        .withMessage("Wrong code"),
];

exports.joinTheClubController = [
    validJoinTheClubCode,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render("joinTheClub", { errors: errors.errors });
            return;
        }
        await updateMembership(req.user.id);
        res.redirect("/join");
    },
];
