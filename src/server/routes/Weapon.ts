import { Router } from "express";
import { AuthGuard } from "../../middlewares/AuthGuard";
import { CreateWeaponUseCase } from "../../useCase/Weapon/Create/CreateWeaponUseCase";
import { CreateWeaponController } from "../../useCase/Weapon/Create/CreateWeaponController";
import { WeaponValidation } from "../../useCase/Weapon/Create/Validations";
import { validator } from "../../middlewares/Validator";

// Create Weapon
const createUseCase = new CreateWeaponUseCase();
const createController = new CreateWeaponController(createUseCase);

const WeaponRoutes = Router();

WeaponRoutes.post(
  "/",
  AuthGuard,
  WeaponValidation,
  validator,
  createController.handle
);

export { WeaponRoutes };
