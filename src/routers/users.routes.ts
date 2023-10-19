import { Router } from "express";
import { createUsersController } from "../controllers/usersCreate.controllers";
import { verifyEmailExistMiddleware } from "../middlewares/users.middlewares";
import { loginUserController } from "../controllers/usersLogin.controllers";
import { verifyEmailLoginExistMiddleware } from "../middlewares/usersLogin.middlewares";
import { updateUserController } from "../controllers/userUpdate.controller";
import { updateUserMMiddleware } from "../middlewares/userUpdate.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { showUsersController } from "../controllers/getUsers.controllers";
import { showUserProfileController } from "../controllers/getUserProfile.controllers";
import { softDeleteUserController } from "../controllers/softDeleteUser.controllers";
import { recoverUserController } from "../controllers/recoverUser.controllers";
import { verifyUserIsAdmin } from "../middlewares/verifyUserIsAdmin.middleware";
import { createUsersMiddleware } from "../middlewares/userCreate.middleware";
import { loginUserMiddleware } from "../middlewares/userLoginValidateBody.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  verifyEmailExistMiddleware,
  createUsersMiddleware,
  createUsersController
);
userRoutes.get("", authMiddleware, verifyUserIsAdmin, showUsersController);
userRoutes.get("/users/profile", authMiddleware, showUserProfileController);
userRoutes.delete(
  "/users/:id",
  authMiddleware,
  updateUserMMiddleware,
  softDeleteUserController
);
userRoutes.put(
  "/users/:id/recover",
  authMiddleware,
  verifyUserIsAdmin,
  updateUserMMiddleware,
  recoverUserController
);
userRoutes.post(
  "/login",
  loginUserMiddleware,
  verifyEmailLoginExistMiddleware,
  loginUserController
);
userRoutes.patch(
  "/users/:id",
  verifyEmailExistMiddleware,
  updateUserMMiddleware,
  authMiddleware,
  updateUserController
);

export { userRoutes };
