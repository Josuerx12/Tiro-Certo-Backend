import { Router } from "express";
import { AuthGuard } from "../../middlewares/AuthGuard";
import { GetAcervoController } from "../../useCase/Acervo/Get/GetAcervoController";
import { GetAcervoUseCase } from "../../useCase/Acervo/Get/GetAcervoUseCase";
import { AcervoEditValidations } from "../../useCase/Acervo/Edit/validations";
import { validator } from "../../middlewares/Validator";
import { EditAcervoUseCase } from "../../useCase/Acervo/Edit/EditAcervoUseCase";
import { EditAcervoController } from "../../useCase/Acervo/Edit/EditAcervoController";
import { DeleteWeaponFromAcervoUseCase } from "../../useCase/Acervo/DeleteWeapon/DeleteWeaponFromAcervoUseCase";
import { DeleteWeaponFromAcervoController } from "../../useCase/Acervo/DeleteWeapon/DeleteWeaponFromAcervoController";

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

const AcervoRoutes = Router();

AcervoRoutes.get("/", AuthGuard, getController.handle);
AcervoRoutes.put(
  "/:id",
  AuthGuard,
  AcervoEditValidations,
  validator,
  editController.handle
);
AcervoRoutes.delete("/:id", AuthGuard, deleteWeaponController.handle);

export { AcervoRoutes };
