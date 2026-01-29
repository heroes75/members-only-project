const { body, validationResult, matchedData } = require("express-validator");
const { insertNewMessage, deleteMessage } = require("../config/db/queries");

const notEmpty = "is not empty";

exports.displayCreateMessageForm = (req, res) => {
    res.render("createMessageForm");
};

const validMessage = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage(`title ${notEmpty}`)
        .isLength({ max: 69 })
        .withMessage("title don't overflow 69 characters"),
    body("text").trim().notEmpty().withMessage(`your message ${notEmpty}`),
];

exports.createMessageController = [
    validMessage,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render("createMessageForm", { errors: errors.errors });
            return;
        }
        const { title, text } = matchedData(req);
        await insertNewMessage({ title, text }, req.user.id);
        res.redirect("/");
    },
];

exports.deleteMessageController = async (req, res) => {
    const id = +req.params?.id;
    if (!id) {
        res.status(404).send("<h1>page not found</h1>");
    }

    if (!req.user.admin) {
        res.status(401).send("<h1>Unauthorized</h1>");
    }

    await deleteMessage(id);
    res.redirect("/");
};
