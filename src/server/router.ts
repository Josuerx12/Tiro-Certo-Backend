import { Request, Response, Router } from "express";

const routesRouter = Router();

routesRouter.get("/", (req: Request, res: Response) =>
  res.send({ msg: "Tiro Facil Funcionando" })
);

export { routesRouter };
