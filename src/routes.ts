import { Router } from "express";

import authMiddleware from "./app/middlewares/authMiddleware";

import AuthController from "./app/controllers/AuthController";
import UserController from "./app/controllers/UserController";

const routes = Router()

routes.post('/users', UserController.store)
routes.get('/users', authMiddleware, UserController.search)

routes.post('/authenticate', AuthController.authenticate)

export default routes