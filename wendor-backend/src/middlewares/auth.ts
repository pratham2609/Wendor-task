// Import the required modules
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "./catchAsyncError";
import User from "../models/user";
import { UserRoles } from "../types/user";
import { ApiError } from "./ApiError";
import dotenv from "dotenv";
dotenv.config();

interface DecodedToken {
    id: string;
    email: string;
}

// Middleware to check if the user is authenticated
export const verifyAuth = catchAsyncErrors(async (req: Request, _: Response, next: NextFunction) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        const token = req.headers.authorization.split("Bearer ")[1];
        if (!token) {
            throw new ApiError(401, "Login first to access this resource");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw new ApiError(403, "User not found");
        }
        req.user = user;
        next();
    } else {
        throw new ApiError(401, "Login first to access this resource");
    }
});


// Middleware to authorize roles
export const verifyAdmin = (req: Request, _: Response, next: NextFunction) => {
    if (req.user!.role !== UserRoles.ADMIN) {
        throw new ApiError(401, "Admin access required");
    }
    next();
};