const { indexControllers } = require("../controllers/index-controller");
const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", indexControllers);

module.exports = indexRouter;
