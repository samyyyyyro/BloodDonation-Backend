const router = require("express").Router();
const {handle, login, logout, loggedin} = require("../controllers/auth")

// register
router.post("/:handle", handle);

// log in
router.post("/login/:handle", login);

//logout
router.get("/logout", logout);

//protected route
router.get("/loggedIn", loggedin);



module.exports = router;
