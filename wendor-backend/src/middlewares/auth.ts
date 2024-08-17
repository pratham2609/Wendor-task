// Import the required modules
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "./catchAsyncError";
import User from "../models/user";
import { UserRoles } from "../types/user";
import { ApiError } from "./ApiError";

interface DecodedToken {
    id: string;
    email: string;
}
export interface AuthenticatedRequest extends Request {
    user?: User | null;
}

// Middleware to check if the user is authenticated
export const verifyAuth = catchAsyncErrors(async (req: AuthenticatedRequest, _: Response, next: NextFunction) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        const token = req.headers.authorization.split("Bearer ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return next(new ApiError(404, "User not found"));
        }
        req.user = user;

        next();
    } else {
        return next(new ApiError(401, "Login first to access this resource"));
    }
});


// Middleware to authorize roles
export const verifyAdmin = (req: AuthenticatedRequest, _: Response, next: NextFunction) => {
    if (req.user!.role !== UserRoles.ADMIN) {
        return next(new ApiError(401, "Admin access required"));
    }
    next();
};