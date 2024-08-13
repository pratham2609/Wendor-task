import express from "express";
import userRoutes from "./user.routes";

const router = express.Router();

// Use Routes
router.use("/user", userRoutes)


export default router;