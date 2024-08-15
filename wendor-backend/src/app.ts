import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { limiter } from "./middlewares/rateLimiter";
import routes from "./routes/index.routes";
import bodyParser from 'body-parser';
import { sequelize } from "./config/database";
import handleError from "./middlewares/handleErrors";

const app: Express = express();

// Passing Middlewares
app.use(express.json({ limit: "50kb" }))
    .use(
        cors({
            origin: [process.env.ALLOWED_ORIGIN_LOCAL!, process.env.ALLOWED_ORIGIN_LIVE!],
            credentials: true,
        })
    ).use(limiter)
    .use(helmet())
    .use(bodyParser.urlencoded({ extended: true }));

// Welcome API
app.get("/", (_: Request, res: Response) => {
    res.json({
        success: true,
        message: "Welcome to Wendor API",
    });
});

sequelize.sync();
// Routes
app.use("/api/v1", routes);

// Middleware for error handling
app.use(handleError);

// 404 error
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        message:
            "404, read the API documentation!",
    });
});

export default app;