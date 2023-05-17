const ApiError = require("../error/ApiError");
const db = require("../models/index");

//bookId -id book from google, id -id from postgresql
class UserBooksController {
   async createBook(req, res, next) {
      try {
         if (!req.user) {
            return next(ApiError.badRequest("Please authorize"));
         }
         const { bookId } = req.params;
         console.log(bookId);
         const book = await db.UserBooks.findOne({ where: { bookId } });
         if (book) {
            return next(ApiError.badRequest("Book already exists"));
         }
         // add img etc
         const { favorite, finished, inProgress, author, title } = req.body;
         const newUserBook = await db.UserBooks.create({
            bookId,
            favorite,
            finished,
            inProgress,
            userEmail: req.user.email,
            author,
            title,
         });
         return res.json({
            id: newUserBook.id,
            bookId,
            favorite,
            finished,
            inProgress,
            userEmail: req.user.email,
            author,
            title,
         });
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
         const { email } = req.user;
         const books = await db.UserBooks.findAll({
            where: { userEmail: email },
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
         next(error);
      }
   }

   async updateBookStatus(req, res, next) {
      if (!req.user) {
         return next(ApiError.badRequest("Not authorized"));
      }
      const { id } = req.params;
      const { favorite } = req.body;
      try {
         if (!favorite) {
            throw new BadRequest("missing field favorite");
         }

         const updateBook = await db.UserBooks.update(
            { favorite: favorite },
            { where: { id } }
         );
         if (!updateBook) {
            throw new NotFound();
         }
         return res.status(200).json(updateBook);
      } catch (error) {
         next(error);
      }
   }
   async deleteBookById(req, res, next) {
      try {
         if (!req.user) {
            return next(ApiError.badRequest("Not authorized"));
         }
         const { id } = req.params; //!!!!databse ID
         const deleteContact = await db.UserBooks.findByPk(id);
         if (!deleteContact) {
            throw new NotFound();
         }
         await deleteContact.destroy();
         res.json({ message: "book was deleted" });
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new UserBooksController();
