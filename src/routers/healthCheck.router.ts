import express from 'express';
import  healthCheckController from "../controllers/healthCheck.controller";

export const healthCheckRouter = express.Router();

healthCheckRouter.get('/healthcheck', healthCheckController.ok);
