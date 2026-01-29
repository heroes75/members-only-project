const { Router } = require("express");
const postMessageController = require("../controllers/create-message-controller");

const createMessageRouter = Router();

createMessageRouter.get("/", postMessageController.displayCreateMessageForm);
createMessageRouter.post("/", postMessageController.createMessageController);
createMessageRouter.post(
    "/:id/delete",
    postMessageController.deleteMessageController,
);

module.exports = createMessageRouter;
