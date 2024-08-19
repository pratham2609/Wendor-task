import express from "express";
import { UserController } from "../controllers/user.controller";
import { verifyAuth } from "../middlewares/auth";

const router = express.Router();

// Route to get, update and delete user
router.route("/").get(verifyAuth, UserController.getUser).put(verifyAuth, UserController.updateUser)
    .delete(verifyAuth, UserController.deleteUser);

// Route to create a new user
router.post("/register", UserController.createUser);

// Route to authenticate a user (login)
router.post("/login", UserController.verifyAuth);

router.post("/forgot-password", UserController.sendResetPasswordMail);

router.post("/reset-password", UserController.resetForgotPassword)

// Route to authenticate an admin
router.post("/admin", UserController.verifyAdminAuth);

router.route("/password")
    .put(verifyAuth, UserController.changePassword);

export default router;
