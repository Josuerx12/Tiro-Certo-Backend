import { Router } from "express";
import { GetAcervoUseCase } from "../../useCase/Acervo/GetAcervoUseCase";
import { GetAcervoController } from "../../useCase/Acervo/GetAcervoController";
import { AuthGuard } from "../../middlewares/AuthGuard";
const AcervoRoute = Router();

const getUseCase = new GetAcervoUseCase();
const getController = new GetAcervoController(getUseCase);

AcervoRoute.get("/", AuthGuard, getController.handle);

export { AcervoRoute };
