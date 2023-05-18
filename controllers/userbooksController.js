const ApiError = require("../error/ApiError");
const db = require("../models/index");

//bookId -id book from google, id -id from postgresql
class UserBooksController {
   async addUserBook(req, res, next) {
      try {
         if (!req.user) {
            return next(ApiError.badRequest("Please authorize"));
         }
         const { bookId } = req.params;
         const book = await db.UserBooks.findOne({
            where: { bookId, userId: req.user.id },
         });
         if (book) {
            return next(ApiError.conflict("Book already exists"));
         }

         const { favorite, finished, inProgress, author, title, image } =
            req.body.book;
         const newUserBook = await db.UserBooks.create({
            bookId,
            favorite,
            finished,
            inProgress,
            userId: req.user.id,
            image,
            author,
            title,
         });
         return res.json(newUserBook);
      } catch (error) {
         return next(ApiError.badRequest(error.message));
      }
   }

   async getUserBooks(req, res, next) {
      try {
         // const { page = 1, limit = 10, id } = req.query;
         // const skip = (page - 1) * limit;
         if (!req.user) {
            return next(ApiError.badRequest("Not authorized"));
         }
         const { id } = req.user;
         const books = await db.UserBooks.findAll({
            where: { userId: id },
         });
         // const contacts = await db.UserBooks.findByPk(
         //    { owner: email }, //?? where
         //    "-createdAt -updatedAt",
         //    {
         //       skip: skip,
         //       limit: +limit,
         //    }
         // );
         res.json(books);
      } catch (error) {
         return next(ApiError.badRequest(error.message));
      }
   }

   async updateBookStatus(req, res, next) {
      if (!req.user) {
         return next(ApiError.badRequest("Not authorized"));
      }
      const { id } = req.params;
      const { favorite, finished, inProgress } = req.body;
      try {
         const updateBook = await db.UserBooks.update(
            { favorite, finished, inProgress },
            { where: { id } }
         );
         if (!updateBook) {
            return next(ApiError.badRequest("Book doesn't exist"));
         }
         return res.status(200).json({ message: "Book was updated" });
      } catch (error) {
         return next(ApiError.badRequest(error.message));
      }
   }
   async deleteBookById(req, res, next) {
      try {
         if (!req.user) {
            return next(ApiError.badRequest("Not authorized"));
         }
         const { id, userId } = req.params; //!!!!databse ID
         const deleteContact = await db.UserBooks.findByPk(id);

         if (!deleteContact) {
            return next(ApiError.badRequest("Book doesn't exist"));
         }
         await deleteContact.destroy();
         res.json(deleteContact.id);
      } catch (error) {
         return next(ApiError.badRequest(error.message));
      }
   }
}

module.exports = new UserBooksController();
