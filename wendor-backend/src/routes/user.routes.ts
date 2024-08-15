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

// Route to authenticate an admin
router.post("/admin", UserController.verifyAdminAuth);

export default router;
