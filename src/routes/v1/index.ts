import express from "express";
import authenticationRouter from '../../modules/authentication/routes';
import courseRouter from "../../modules/course/routes";


const appRouter = express.Router();

appRouter.use("/auth", authenticationRouter);
appRouter.use("/courses", courseRouter);

export const Router = appRouter;
