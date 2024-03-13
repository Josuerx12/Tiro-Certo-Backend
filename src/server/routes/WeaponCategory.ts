import { Router } from "express";
import { GetAllWeaponCategoryUseCase } from "../../useCase/WeaponCategory/GetAll/GetAllWeaponCategoryUseCase";
import { GetAllWeaponCategoryController } from "../../useCase/WeaponCategory/GetAll/GetAllWeaponCategoryController";
import { AuthGuard } from "../../middlewares/AuthGuard";
import { CreateWeaponCategoryUseCase } from "../../useCase/WeaponCategory/Create/CreateWeaponCategoryUseCase";
import { CreateWeaponCategoryController } from "../../useCase/WeaponCategory/Create/CreateWeaponCategoryController";
import { Upload } from "../../config/Upload";
import { CreateWeaponCategoryValidation } from "../../useCase/WeaponCategory/Create/Validations";
import { validator } from "../../middlewares/Validator";
import { DeleteWeaponCategoryUseCase } from "../../useCase/WeaponCategory/Delete/DeleteWeaponCategoryUseCase";
import { DeleteWeaponCategoryController } from "../../useCase/WeaponCategory/Delete/DeleteWeaponCategoryController";
import { EditWeaponsCategoryValidation } from "../../useCase/WeaponCategory/Edit/Validations";
import { EditWeaponCategoryUseCase } from "../../useCase/WeaponCategory/Edit/EditWeaponCategoryUseCase";
import { EditWeaponCategoryController } from "../../useCase/WeaponCategory/Edit/EditWeaponCategoryController";

// Get all
const getAllUseCase = new GetAllWeaponCategoryUseCase();
const getAllController = new GetAllWeaponCategoryController(getAllUseCase);

// Create Category
const createUseCase = new CreateWeaponCategoryUseCase();
const createController = new CreateWeaponCategoryController(createUseCase);

// Delete Category
const deleteUseCase = new DeleteWeaponCategoryUseCase();
const deleteController = new DeleteWeaponCategoryController(deleteUseCase);

// Edit Category
const editUseCase = new EditWeaponCategoryUseCase();
const editController = new EditWeaponCategoryController(editUseCase);

const WeaponCategoriesRoutes = Router();

WeaponCategoriesRoutes.get("/", AuthGuard, getAllController.handle);
WeaponCategoriesRoutes.post(
  "/",
  AuthGuard,
  Upload.single("category-logo"),
  CreateWeaponCategoryValidation,
  validator,
  createController.handle
);
WeaponCategoriesRoutes.delete("/:id", AuthGuard, deleteController.handle);
WeaponCategoriesRoutes.put(
  "/:id",
  AuthGuard,
  Upload.single("category-logo"),
  EditWeaponsCategoryValidation,
  validator,
  editController.handle
);

export { WeaponCategoriesRoutes };
