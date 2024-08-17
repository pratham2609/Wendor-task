import { Request, Response } from "express";
import { ApiError } from "./ApiError";

const errorHandler = (error: ApiError, _: Request, res: Response) => {
    if (error instanceof ApiError) {
        if (error.message) {
            return res.status(error.statusCode).send(error.message);
        } else {
            return res.sendStatus(error.statusCode);
        }
    }
};

export default errorHandler;
