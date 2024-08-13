import express from "express";
import { UserController } from "../controllers/user.controller";

const router = express.Router();

// Route to create a new user
router.post("/register", UserController.createUser);

router.get("/:id", UserController.getUserById)
    .put("/:id", UserController.updateUser)
    .delete("/:id", UserController.deleteUser);

// Route to authenticate a user (login)
router.post("/login", UserController.authenticateUser);

export default router;
