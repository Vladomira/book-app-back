const Router = require("express");
const router = new Router();
const UserBooksController = require("../controllers/userbooksController");

const authMidlware = require("../midlware/AuthMidlware");

router.get("/", authMidlware, UserBooksController.getUserBooks);
router.post("/:bookId", authMidlware, UserBooksController.createBook);
router.patch(
   "/:id/favorite",
   authMidlware,
   UserBooksController.updateBookStatus
);
router.delete("/:id", authMidlware, UserBooksController.deleteBookById);

module.exports = router;
