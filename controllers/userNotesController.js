const ApiError = require("../error/ApiError");
const db = require("../models/index");

class userNotes {
   async createNote(req, res, next) {
      try {
         if (!req.user) {
            return next(ApiError.badRequest("Please authorize"));
         }

         const { bookId } = req.params;
         const { text, chapter } = req.body;
         if (!chapter) {
            return next(ApiError.badRequest("No any notes to save"));
         }
         const notes = await db.UserNotes.create({
            bookId,
            text,
            chapter,
            userId: req.user.id,
         });
         return res.status(201).json(notes);
      } catch (error) {
         return next(ApiError.badRequest(error.message));
      }
   }

   async getNotes(req, res, next) {
      try {
         if (!req.user) {
            return next(ApiError.badRequest("Not authorized"));
         }
         const { id } = req.user;
         const books = await db.UserNotes.findAll({
            where: { userId: id },
         });

         res.json(books);
      } catch (error) {
         return next(ApiError.badRequest(error.message));
      }
   }
}

module.exports = new userNotes();
