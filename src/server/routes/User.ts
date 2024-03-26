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
import { PowerGuard } from "../../middlewares/PowerGuard";
import { DeleteUserController } from "../../useCase/User/Delete/DeleteUserController";
import { DeleteUserUseCase } from "../../useCase/User/Delete/DeleteUserUseCase";
import { GetUsersByCpfUseCase } from "../../useCase/User/GetOneByCpf/GetUsersByCpfUseCase";
import { GetUsersByCpfController } from "../../useCase/User/GetOneByCpf/GetUsersByCpfController";

const userRoutes = Router();

// Edit
const editUseCase = new EditUserUseCase();
const editController = new EditUserController(editUseCase);

// GET ALL
const getAllCase = new GetUsersUseCase();
const getAllController = new GetUsersController(getAllCase);

// GET CPF
const getOneCpfUseCase = new GetUsersByCpfUseCase();
const getOneCpfController = new GetUsersByCpfController(getOneCpfUseCase);

// GET ONE
const getOneController = new GetUserController();

// Delete One
const deleteUseCase = new DeleteUserUseCase();
const deleteController = new DeleteUserController(deleteUseCase);

// Power Guard
const power = new PowerGuard();

userRoutes.put(
  "/:id",
  AuthGuard,
  Upload.single("profile-pic"),
  editUserValidations,
  validator,
  editController.handle
);
userRoutes.delete("/:id", AuthGuard, power.founder, deleteController.handle);

userRoutes.get(
  "/all",
  AuthGuard,
  power.adminAndFounder,
  getAllController.handle
);
userRoutes.get("/one/:cpf", getOneCpfController.handle);
userRoutes.get("/", AuthGuard, getOneController.handle);

export { userRoutes };
