const { getAllMessages } = require("../config/db/queries")

async function indexControllers(req, res, next) {
    const result = await getAllMessages()
    res.render('indexPage', { messages: result})
}

module.exports = {
    indexControllers
}