import express from "express";
import * as UserController from "./user.controller.js";
import validateUser from "../../middlewares/validateUser.middleware.js";

const userRouter = express.Router();

userRouter.post("/signup", validateUser, UserController.registration);
userRouter.post("/signin", validateUser, UserController.login);

export default userRouter;
