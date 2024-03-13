import { Router } from "express";
import { AuthGuard } from "../../middlewares/AuthGuard";
import { GetAcervoController } from "../../useCase/Acervo/Get/GetAcervoController";
import { GetAcervoUseCase } from "../../useCase/Acervo/Get/GetAcervoUseCase";
import { validator } from "../../middlewares/Validator";
import { EditAcervoUseCase } from "../../useCase/Acervo/Edit/EditAcervoUseCase";
import { EditAcervoController } from "../../useCase/Acervo/Edit/EditAcervoController";
import { DeleteWeaponFromAcervoUseCase } from "../../useCase/Acervo/DeleteWeapon/DeleteWeaponFromAcervoUseCase";
import { DeleteWeaponFromAcervoController } from "../../useCase/Acervo/DeleteWeapon/DeleteWeaponFromAcervoController";
import { PowerGuard } from "../../middlewares/PowerGuard";
import { AcervoEditValidations } from "../../useCase/Acervo/Edit/Validations";

// Get acervo
const getUseCase = new GetAcervoUseCase();
const getController = new GetAcervoController(getUseCase);

// Edit Acervo
const editUseCase = new EditAcervoUseCase();
const editController = new EditAcervoController(editUseCase);

// Delete Weapon
const deleteWeaponUseCase = new DeleteWeaponFromAcervoUseCase();
const deleteWeaponController = new DeleteWeaponFromAcervoController(
  deleteWeaponUseCase
);

// Power Guard
const power = new PowerGuard();

const AcervoRoutes = Router();

AcervoRoutes.get("/", AuthGuard, getController.handle);
AcervoRoutes.put(
  "/:id",
  AuthGuard,
  power.adminAndFounder,
  AcervoEditValidations,
  validator,
  editController.handle
);
AcervoRoutes.delete(
  "/:id",
  AuthGuard,
  power.founder,
  deleteWeaponController.handle
);

export { AcervoRoutes };
