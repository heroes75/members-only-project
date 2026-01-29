const { Router } = require("express");
const {
    displayJoinTheClubPage,
} = require("../controllers/join-the-club-controller");
const joinTheClub = require("../controllers/join-the-club-controller");

const joinTheClubRouter = Router();

joinTheClubRouter.get("/", displayJoinTheClubPage);
joinTheClubRouter.post("/", joinTheClub.joinTheClubController);

module.exports = joinTheClubRouter;
