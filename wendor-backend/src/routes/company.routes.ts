import express from "express";
import { CompanyController } from "../controllers/company.controllers";

const router = express.Router();

// Routes to create and get all companies
router.route("/").post(CompanyController.createCompany)
    .get(CompanyController.getAllCompanies);

// Routes to update and delete company by id
router.route("/:id").put(CompanyController.updateCompany)
    .delete(CompanyController.deleteCompany);

export default router;
