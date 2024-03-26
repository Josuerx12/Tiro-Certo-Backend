import { Router } from "express";
import { GetActivitiesRegisterUseCase } from "../../useCase/ActivityRegister/GetAll/GetActivitiesRegisterUseCase";
import { GetActivityRegisterUseCase } from "../../useCase/ActivityRegister/Get/GetActivityRegisterUseCase";
import { GetActivityRegisterController } from "../../useCase/ActivityRegister/Get/GetActivityRegisterController";
import { AuthGuard } from "../../middlewares/AuthGuard";
import { GetActivityRegisterValidation } from "../../useCase/ActivityRegister/Get/Validations";
import { validator } from "../../middlewares/Validator";
import { GetActivitiesRegisterController } from "../../useCase/ActivityRegister/GetAll/GetActivitiesRegisterController";
import { GetActivityRegisterByUserUseCase } from "../../useCase/ActivityRegister/GetByUser/GetActivityRegisterByUserUseCase";
import { GetActivityRegisterByUserController } from "../../useCase/ActivityRegister/GetByUser/GetActivityRegisterByUserController";
import { CreateActivityRegisterUseCase } from "../../useCase/ActivityRegister/Create/CreateActivityRegisterUseCase";
import { CreateActivityRegisterController } from "../../useCase/ActivityRegister/Create/CreateActivityRegisterController";
import { CreateActivityRegisterValidations } from "../../useCase/ActivityRegister/Create/Validations";
import { DeleteActivityRegisterValidation } from "../../useCase/ActivityRegister/Delete/Validations";
import { DeleteActivityRegisterUseCase } from "../../useCase/ActivityRegister/Delete/DeleteActivityRegisterUseCase";
import { DeleteActivityRegisterController } from "../../useCase/ActivityRegister/Delete/DeleteActivityRegisterController";
import { PowerGuard } from "../../middlewares/PowerGuard";

// Get Activity
const getByIdUseCase = new GetActivityRegisterUseCase();
const getByIdController = new GetActivityRegisterController(getByIdUseCase);

// Get All Activities
const getAllUseCase = new GetActivitiesRegisterUseCase();
const getAllController = new GetActivitiesRegisterController(getAllUseCase);

// Get By User
const getByUserUseCase = new GetActivityRegisterByUserUseCase();
const getByUserController = new GetActivityRegisterByUserController(
  getByUserUseCase
);

// Create Activity
const createUseCase = new CreateActivityRegisterUseCase();
const createController = new CreateActivityRegisterController(createUseCase);

// Delete Activity
const deleteUseCase = new DeleteActivityRegisterUseCase();
const deleteController = new DeleteActivityRegisterController(deleteUseCase);

// Power Guard
const power = new PowerGuard();

const ActivityRegisterRoutes = Router();

ActivityRegisterRoutes.get("/", AuthGuard, getByUserController.handle);
ActivityRegisterRoutes.get(
  "/details/:id",
  AuthGuard,
  GetActivityRegisterValidation,
  validator,
  getByIdController.handle
);
ActivityRegisterRoutes.get(
  "/all",
  AuthGuard,
  power.adminAndFounder,
  getAllController.handle
);
ActivityRegisterRoutes.post(
  "/",
  AuthGuard,
  CreateActivityRegisterValidations,
  validator,
  createController.handle
);
ActivityRegisterRoutes.delete(
  "/:id",
  AuthGuard,
  power.founder,
  DeleteActivityRegisterValidation,
  validator,
  deleteController.handle
);

export { ActivityRegisterRoutes };
