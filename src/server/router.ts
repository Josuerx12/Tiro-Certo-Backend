import { Request, Response, Router } from "express";
import { authRoutes } from "./routes/Auth";

const routesRouter = Router();

routesRouter.get("/", (req: Request, res: Response) =>
  res.send({ msg: "Tiro Facil Funcionando" })
);

routesRouter.use("/auth", authRoutes);

export { routesRouter };
