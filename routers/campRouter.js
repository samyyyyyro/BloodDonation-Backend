const router = require("express").Router();
const { home, statesDistrict, statesDistrictDate, authUserId } = require("../controllers/camp");
const auth = require("../middleware/auth");


router.post("/", auth, home);

router.get("/:state?/:district?", auth, statesDistrict);

router.get("/allCamps/:state/:district/:date", statesDistrictDate);

router.put("/:id/:userId?", auth, authUserId)

module.exports = router;