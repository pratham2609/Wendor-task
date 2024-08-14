import express from "express";
import { CompanyController } from "../controllers/company.controllers";
import { verifyAdmin, verifyAuth } from "../middlewares/auth";

const router = express.Router();


// -- Admin Routes --

// Routes to create and get all companies
router.route("/").post(verifyAuth, verifyAdmin, CompanyController.createCompany)
    .get(verifyAuth, verifyAdmin, CompanyController.getAllCompanies);

// Routes to update and delete company by id
router.route("/:id").put(verifyAuth, verifyAdmin, CompanyController.updateCompany)
    .delete(verifyAuth, verifyAdmin, CompanyController.deleteCompany);

export default router;
