import express from "express";
import {validateDtoMiddleware} from "../middlewares/validate-dto.middleware.js";
import {UserUpdateBalanceRequestDTO} from "../controllers/user.dto.js";
import UserController from '../controllers/user.controller.js'
import userService from "../services/user.service.js";

const router = express.Router();

const userController = new UserController(userService)
router.put('/balance', validateDtoMiddleware(UserUpdateBalanceRequestDTO), userController.updateBalance);

export default router
