const { Router } = require("express");
const becomeAdminController = require("../controllers/become-admin-controller");

const becomeAdminRouter = Router()

becomeAdminRouter.get('/', becomeAdminController.displayBecomeAdminForm)
becomeAdminRouter.post('/', becomeAdminController.becomeAdminController)

module.exports = becomeAdminRouter