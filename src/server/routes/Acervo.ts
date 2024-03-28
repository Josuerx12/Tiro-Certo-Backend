import { Router } from "express";
import { GetAcervoUseCase } from "../../useCase/Acervo/GetAcervoUseCase";
import { GetAcervoController } from "../../useCase/Acervo/GetAcervoController";
import { AuthGuard } from "../../middlewares/AuthGuard";
import { GetAcervoByOwnerIdUseCase } from "../../useCase/Acervo/findByOwnerId/GetAcervoByOwnerIdUseCase";
import { GetAcervoByOwnerIdController } from "../../useCase/Acervo/findByOwnerId/GetAcervoByOwnerIdController";
import { PowerGuard } from "../../middlewares/PowerGuard";
import { GetAllAcervoUseCase } from "../../useCase/Acervo/getAll/GetAcervoUseCase";
import { GetAllAcervoController } from "../../useCase/Acervo/getAll/GetAcervoController";
const AcervoRoute = Router();

// Get acervo
const getUseCase = new GetAcervoUseCase();
const getController = new GetAcervoController(getUseCase);

// Get acervo by cpf
const getOneUseCase = new GetAcervoByOwnerIdUseCase();
const getOneController = new GetAcervoByOwnerIdController(getOneUseCase);

// Get All Acervos
const getAllUseCase = new GetAllAcervoUseCase();
const getAllController = new GetAllAcervoController(getAllUseCase);

const power = new PowerGuard();

AcervoRoute.get("/", AuthGuard, getController.handle);
AcervoRoute.get(
  "/all",
  AuthGuard,
  power.adminAndFounder,
  getAllController.handle
);
AcervoRoute.get("/:userId", getOneController.handle);

export { AcervoRoute };
