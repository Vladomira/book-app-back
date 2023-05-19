const Router = require("express");
const router = new Router();
const userNotes = require("../controllers/userNotesController");

const authMidlware = require("../midlware/AuthMidlware");

router.post("/:bookId", authMidlware, userNotes.createNote);
router.get("/:userId", authMidlware, userNotes.getNotes);
// patch
// delete

module.exports = router;
