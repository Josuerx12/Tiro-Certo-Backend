import { Router } from "express";
import { GetAcervoUseCase } from "../../useCase/Acervo/GetAcervoUseCase";
import { GetAcervoController } from "../../useCase/Acervo/GetAcervoController";
import { AuthGuard } from "../../middlewares/AuthGuard";
import { GetAcervoByOwnerIdUseCase } from "../../useCase/Acervo/findByOwnerId/GetAcervoByOwnerIdUseCase";
import { GetAcervoByOwnerIdController } from "../../useCase/Acervo/findByOwnerId/GetAcervoByOwnerIdController";
const AcervoRoute = Router();

// Get acervo
const getUseCase = new GetAcervoUseCase();
const getController = new GetAcervoController(getUseCase);

// Get acervo by cpf
const getOneUseCase = new GetAcervoByOwnerIdUseCase();
const getOneController = new GetAcervoByOwnerIdController(getOneUseCase);

AcervoRoute.get("/", AuthGuard, getController.handle);
AcervoRoute.get("/:userId", getOneController.handle);

export { AcervoRoute };
