import { Router } from "express";
import { GetClubUseCase } from "../../useCase/Club/Get/GetClubUseCase";
import { GetClubController } from "../../useCase/Club/Get/GetClubController";
import { AuthGuard } from "../../middlewares/AuthGuard";
import { GetAllClubUseCase } from "../../useCase/Club/GetAll/GetAllClubUseCase";
import { GetAllClubController } from "../../useCase/Club/GetAll/GetAllClubController";
import { CreateClubUseCase } from "../../useCase/Club/Create/CreateClubUseCase";
import { CreateClubController } from "../../useCase/Club/Create/CreateClubController";
import { CreateClubValidations } from "../../useCase/Club/Create/Validations";
import { validator } from "../../middlewares/Validator";
import { Upload } from "../../config/Upload";
import { DeleteClubUseCase } from "../../useCase/Club/Delete/DeleteClubUseCase";
import { DeleteClubController } from "../../useCase/Club/Delete/DeleteClubController";
import { DeleteClubValidation } from "../../useCase/Club/Delete/Validations";
import { EditClubUseCase } from "../../useCase/Club/Edit/EditClubUseCase";
import { EditClubController } from "../../useCase/Club/Edit/EditClubController";
import { EditClubValidations } from "../../useCase/Club/Edit/Validations";

// Get Club
const getOneUseCase = new GetClubUseCase();
const getOneController = new GetClubController(getOneUseCase);

// Get All Clubs
const getAllUseCase = new GetAllClubUseCase();
const getAllController = new GetAllClubController(getAllUseCase);

// Create Club
const createUseCase = new CreateClubUseCase();
const createController = new CreateClubController(createUseCase);

// Delete Club
const deleteUseCase = new DeleteClubUseCase();
const deleteController = new DeleteClubController(deleteUseCase);

// Edit Club
const editUseCase = new EditClubUseCase();
const editController = new EditClubController(editUseCase);

const ClubRoutes = Router();

ClubRoutes.get("/:id", AuthGuard, getOneController.handle);
ClubRoutes.get("/", AuthGuard, getAllController.handle);
ClubRoutes.post(
  "/new",
  AuthGuard,
  Upload.single("club-logo"),
  CreateClubValidations,
  validator,
  createController.handle
);
ClubRoutes.delete(
  "/:id",
  AuthGuard,
  DeleteClubValidation,
  validator,
  deleteController.handle
);
ClubRoutes.put(
  "/:id",
  AuthGuard,
  Upload.single("club-logo"),
  EditClubValidations,
  validator,
  editController.handle
);

export { ClubRoutes };
