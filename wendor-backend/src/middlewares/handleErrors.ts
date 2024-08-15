// Import utils
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler.js";
import {
    ValidationError,
    UniqueConstraintError,
    DatabaseError,
} from "sequelize";

const handleError = (err: Error, _: Request, res: Response, next: NextFunction) => {
    let error = err as ErrorHandler;
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Error";

    // Sequelize validation error
    if (err instanceof ValidationError) {
        const message = err.errors.map((e) => e.message).join(", ");
        err = new ErrorHandler(message, 400);
    }

    // Sequelize unique constraint error
    if (err instanceof UniqueConstraintError) {
        const message = `Duplicate ${Object.keys(err.fields).join(", ")} entered`;
        err = new ErrorHandler(message, 400);
    }

    // Sequelize database error
    if (err instanceof DatabaseError) {
        console.log(err);
        const message = "Database error occurred";
        err = new ErrorHandler(message, 500);
    }

    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = "JSON Web Token is invalid. Try Again";
        err = new ErrorHandler(message, 400);
    }

    // JWT Expired error
    if (err.name === "TokenExpiredError") {
        const message = "JSON Web Token is expired. Try Again";
        err = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default handleError;