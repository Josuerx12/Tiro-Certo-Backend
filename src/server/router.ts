import { Request, Response, Router } from "express";
import { authRoutes } from "./routes/Auth";
import { userRoutes } from "./routes/User";

const routesRouter = Router();

routesRouter.get("/", (req: Request, res: Response) =>
  res.send({ msg: "Tiro Facil Funcionando" })
);

routesRouter.use("/auth", authRoutes);
routesRouter.use("/user", userRoutes);

export { routesRouter };
