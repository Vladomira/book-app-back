const Router = require("express");
const router = new Router();
const UserController = require("../controllers/userController");
const authMidlware = require("../midlware/AuthMidlware");

router.post("/signup", UserController.registration);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.post("/refresh", UserController.refresh);
router.get("/current", authMidlware, UserController.getUser);
// router.delete("/:id", authMidlware, UserController.deleteUser);

// router.post('/verify', secondVerify)
// router.get('/verify/:verificationToken', userVerification)
// **
module.exports = router;
