import { Router } from "express";
import { AuthGuard } from "../../middlewares/AuthGuard";
import { Upload } from "../../config/Upload";
import { editUserValidations } from "../../useCase/User/Edit/Validations";
import { validator } from "../../middlewares/Validator";
import { EditUserUseCase } from "../../useCase/User/Edit/EditUserUseCase";
import { EditUserController } from "../../useCase/User/Edit/EditUserController";
import { GetUsersUseCase } from "../../useCase/User/GetAll/GetUsersUseCase";
import { GetUsersController } from "../../useCase/User/GetAll/GetUsersController";
import { GetUserController } from "../../useCase/User/Get/GetUserController";

const userRoutes = Router();

// Edit
const editUseCase = new EditUserUseCase();
const editController = new EditUserController(editUseCase);

// GET ALL
const getAllCase = new GetUsersUseCase();
const getAllController = new GetUsersController(getAllCase);

// GET ONE
const getOneController = new GetUserController();

userRoutes.put(
  "/:id",
  AuthGuard,
  Upload.single("profile-pic"),
  editUserValidations,
  validator,
  editController.handle
);

userRoutes.get("/all", AuthGuard, getAllController.handle);
userRoutes.get("/", AuthGuard, getOneController.handle);

export { userRoutes };
