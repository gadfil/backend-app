import express from "express";
import {validateDto} from "../middlewares/validate-dto.js";
import {UserUpdateBalanceRequestDTO} from "../controllers/user.dto.js";
import UserController from '../controllers/UserController.js'
import userService from "../services/UserService.js";

const router = express.Router();

const userController = new UserController(userService)
router.put('/balance', validateDto(UserUpdateBalanceRequestDTO), userController.updateBalance);

export default router