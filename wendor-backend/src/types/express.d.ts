import { Request } from 'express';
import User from '../models/user';

declare module 'express-serve-static-core' {
    interface Request {
        fileUrl?: string;
        user?: User
    }
}