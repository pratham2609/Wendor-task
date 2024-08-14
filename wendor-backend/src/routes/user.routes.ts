import express from "express";
import { UserController } from "../controllers/user.controller";
import { verifyAuth } from "../middlewares/auth";

const router = express.Router();

// Route to create a new user
router.post("/register", UserController.createUser);

router.route("/:id").get(verifyAuth, UserController.getUserById)
    .put(verifyAuth, UserController.updateUser)
    .delete(verifyAuth, UserController.deleteUser);

// Route to authenticate a user (login)
router.post("/login", UserController.verifyAuth);

export default router;
