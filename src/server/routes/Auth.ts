import { Router } from "express";
import { RegisterController } from "../../useCase/Auth/Register/RegisterController";
import { registerValidations } from "../../useCase/Auth/Register/Valdations";
import { validator } from "../../middlewares/Validator";
import RegisterUseCase from "../../useCase/Auth/Register/RegisterUseCase";
import { LoginUseCase } from "../../useCase/Auth/Login/LoginUseCase";
import { LoginController } from "../../useCase/Auth/Login/LoginController";
import { loginValidations } from "../../useCase/Auth/Login/Validations";

const authRoutes = Router();

// Register
const registerUseCase = new RegisterUseCase();
const registerController = new RegisterController(registerUseCase);

// Login
const loginUseCase = new LoginUseCase();
const loginController = new LoginController(loginUseCase);

authRoutes.post(
  "/register",
  registerValidations,
  validator,
  registerController.handle
);
authRoutes.post("/login", loginValidations, validator, loginController.handle);

export { authRoutes };
