import { Router } from "express";
import { RegisterController } from "../../useCase/Auth/Register/RegisterController";
import { RegisterValidations } from "../../useCase/Auth/Register/Valdations";
import { validator } from "../../middlewares/Validator";
import { RegisterUseCase } from "../../useCase/Auth/Register/RegisterUseCase";

const authRoutes = Router();

const registerUseCase = new RegisterUseCase();
const registerController = new RegisterController(registerUseCase);

authRoutes.post(
  "/register",
  RegisterValidations,
  validator,
  registerController.handle
);

export { authRoutes };
