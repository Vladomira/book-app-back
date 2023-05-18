const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
const db = require("../models/index");

const generateJwt = (id, name, email) => {
   return jwt.sign({ id, name, email }, process.env.SECRET_KEY, {
      expiresIn: "24h",
   });
};

class UserController {
   async registration(req, res, next) {
      try {
         const { name, email, password } = req.body;
         if (!email || !password) {
            return next(ApiError.badRequest("Incorrect email or password "));
         }
         const candidate = await db.User.findOne({ where: { email } });
         if (candidate) {
            return next(ApiError.badRequest("User already exists"));
         }
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(password, salt);

         const id = Date.now().toString();
         const token = generateJwt(id, name, email);
         const newUser = await db.User.create({
            id,
            name,
            email,
            password: hashPassword,
            token,
         });

         return res.status(201).json({
            user: {
               id: newUser.id,
               email: newUser.email,
               name: newUser.name,
               token,
            },
         });
      } catch (error) {
         return next(ApiError.badRequest(error.message));
      }
   }

   async login(req, res, next) {
      try {
         const { email, password } = req.body;
         const user = await db.User.findOne({ where: { email } });

         if (!user) {
            return next(ApiError.internal(`User doesn't exist`));
         }
         const comparePassword = bcrypt.compareSync(password, user.password);
         if (!comparePassword) {
            return next(ApiError.internal(`Wrong password`));
         }

         const token = generateJwt(user.id, user.name, user.email);
         await db.User.update({ token }, { where: { email } });
         return res.status(201).json({
            user: {
               id: user.id,
               email: user.email,
               name: user.name,
               token,
            },
         });
      } catch (error) {
         return next(ApiError.badRequest(error.message));
      }
   }

   async logout(req, res, next) {
      const { id } = req.body;
      try {
         const user = await db.User.findOne({ where: { id } });
         if (!user) {
            return next(ApiError.internal(`User doesn't exist`));
         }
         await db.User.update({ token: null }, { where: { id } });

         return res.status(201).json({ message: "User successfully logout" });
      } catch (error) {
         return next(ApiError.badRequest(error.message));
      }
   }

   async getUser(req, res, next) {
      try {
         if (!req.user) {
            return next(ApiError.badRequest("Not authorized"));
         }
         const { email, name, id } = req.user;
         res.json({
            user: {
               email,
               name,
               id,
            },
         });
      } catch (error) {
         return next(ApiError.badRequest(error.message));
      }
   }
   async deleteUser(req, res, next) {
      // зробити форму з вводом пароля для того, щоб видалитись
      const userId = req.params.id;
      try {
         const user = await db.User.findByPk(userId);

         if (!user) {
            return next(ApiError.internal(`User doesn't exist`));
         }

         await user.destroy();
         res.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
         return next(ApiError.badRequest(error.message));
      }
   }
}
module.exports = new UserController();

// const userVerification = async (req, res, next) => {
//    try {
//      const { verificationToken } = req.params
//      const user = await User.findOne({ verificationToken })
//      if (!user) {
//        throw new NotFound('User not found')
//      }
//      await User.findByIdAndUpdate(user._id, {
//        verificationToken: null,
//        verify: true,
//      })
//      res.json({ message: 'Verification successful' })
//    } catch (error) {
//      next(error)
//    }
//  }
//  const secondVerify = async (req, res, next) => {
//    try {
//      const { email } = req.body
//      if (!email) {
//        throw new BadRequest('missing required field email')
//      }
//      const user = await User.findOne({ email })
//      if (!user) {
//        throw new NotFound('User not found')
//      }
//      if (user.verify) {
//        throw new BadRequest('Verification has already been passed')
//      }
//      const { verificationToken } = user
//      const data = {
//        to: email,
//        subject: 'Email confirmation',
//        html: `<a target="_blank" href="${SITE_NAME}/User/verify/${verificationToken}">Confirm email</a>`,
//      }
//      await sendEmail(data)

//      res.json({ message: 'Verification email sent' })
//    } catch (error) {
//      next(error)
//    }
//  }
