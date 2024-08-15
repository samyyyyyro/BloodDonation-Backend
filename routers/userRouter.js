const router = require("express").Router();
const auth = require("../middleware/auth");
// const { User, Donations, Requests, BloodBank } = require("../models/models");
const {homeUser,userDonate, userRequest, viewDonations, viewRequests, home } = require("../controllers/user")

router.get("/", auth, homeUser);

router.post("/donate", auth, userDonate);

router.post("/request", auth, userRequest)

router.get("/donations", auth, viewDonations);

router.get("/requests", auth, viewRequests);

router.put("/", auth, home);

module.exports = router;
