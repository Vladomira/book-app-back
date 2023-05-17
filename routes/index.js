const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const userBooksRouter = require("./userBooksRouter");

router.use("/user", userRouter);
router.use("/user-book", userBooksRouter);

module.exports = router;
