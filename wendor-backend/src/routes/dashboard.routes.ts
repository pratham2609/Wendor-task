import express from "express";
import { verifyAdmin, verifyAuth } from "../middlewares/auth";
import { DashboardController } from "../controllers/dashboard.controllers";

const router = express.Router();

// -- Admin route --
// Route to get dashboard data
router.get("/", verifyAuth, verifyAdmin, DashboardController.getDashboardData);


export default router;
