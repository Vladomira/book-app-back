const UserService = require("../servise/user");
const ApiError = require("../error/ApiError");

class UserController {
   async registration(req, res, next) {
      try {
         const { name, email, password } = req.body;

         if (!email || !password) {
            return next(ApiError.BadRequest("Incorrect email or password "));
         }
         const userData = await UserService.registration(name, email, password);
         res.cookie("refreshToken", userData.refreshToken, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000,
         });
         const { id, accessToken } = userData;
         return res
            .status(201)
            .json({ user: { id, name, email }, accessToken });
      } catch (error) {
         // status 500 |401
         next(error);
         // return next(ApiError.badRequest(error.message));
      }
   }

   async login(req, res, next) {
      try {
         const { email, password } = req.body;

         const userData = await UserService.login(email, password);
         res.cookie("refreshToken", userData.refreshToken, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000,
         });

         const { accessToken, id, name } = userData;

         return res.status(201).json({
            user: { id, name, email },
            accessToken,
         });
      } catch (error) {
         // 401
         return next(ApiError.BadRequest(error, error.message));
         // next(error);
      }
   }

   async logout(req, res, next) {
      try {
         const { refreshToken } = req.cookies;
         const token = await UserService.logout(refreshToken);
         res.clearCookie("refreshToken");

         return res.status(201).json(token);
      } catch (error) {
         next(error);
      }
   }
   async refresh(req, res, next) {
      try {
         const { refreshToken } = req.cookies;
         const userData = await UserService.refresh(refreshToken);
         res.cookie("refreshToken", userData.refreshToken, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000,
         });
         const { accessToken, id, name, email } = userData;
         return res.status(201).json({
            user: { id, name, email },
            accessToken,
         });
      } catch (error) {
         next(error);
      }
   }
   async getUser(req, res, next) {
      try {
         const current = await UserService.getUser(req, res);
         return current;
      } catch (error) {
         next(error);
      }
   }
}
module.exports = new UserController();
