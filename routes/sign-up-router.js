const { Router } = require("express");
const {
    displaySignUpPage,
    signUpController,
    signUpConstraint,
} = require("../controllers/sign-up-controller");

const signUpRouter = Router();

signUpRouter.get("/", displaySignUpPage);
signUpRouter.post("/", signUpConstraint, signUpController);

module.exports = signUpRouter;
