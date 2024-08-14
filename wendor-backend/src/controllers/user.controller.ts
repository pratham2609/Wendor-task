import { Request, Response } from "express";
import { UserService } from "../services/userService";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import { UserRepository } from "../repository/userRepository";
import { AuthenticatedRequest } from "../middlewares/auth";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class UserController {
    static createUser = catchAsyncError(async (req: Request, res: Response) => {
        const { user, token } = await userService.createUser(req.body);
        res.status(201).json({ success: true, token, data: user });
    });

    static getUser = catchAsyncError(async (req: AuthenticatedRequest, res: Response) => {
        const user = await userService.getUserById(req.user?.id!);
        res.status(200).json({ success: true, data: user });
    })

    static updateUser = catchAsyncError(async (req: AuthenticatedRequest, res: Response) => {
        const user = await userService.updateUser(req.user?.id!, req.body);
        res.status(200).json({ success: true, data: user });
    });

    static deleteUser = catchAsyncError(async (req: AuthenticatedRequest, res: Response) => {
        await userService.deleteUser(req.user?.id!);
        res.status(200).json({ success: true, message: "User deleted" });
    });

    static verifyAuth = catchAsyncError(async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const { user, token } = await userService.loginUser(email, password);
        res.status(200).json({ success: true, token, user });
    });
}
