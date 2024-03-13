import { Request, Response, Router } from "express";
import { authRoutes } from "./routes/Auth";
import { userRoutes } from "./routes/User";
import { ClubRoutes } from "./routes/Club";
import { AcervoRoutes } from "./routes/Arcevo";
import { ActivityRegisterRoutes } from "./routes/ActivityRegister";
import { WeaponCategoriesRoutes } from "./routes/WeaponCategory";

const routesRouter = Router();

routesRouter.get("/", (req: Request, res: Response) =>
  res.send({ msg: "Tiro Facil Funcionando" })
);

routesRouter.use("/auth", authRoutes);
routesRouter.use("/user", userRoutes);
routesRouter.use("/club", ClubRoutes);
routesRouter.use("/acervo", AcervoRoutes);
routesRouter.use("/activityRegister", ActivityRegisterRoutes);
routesRouter.use("/weaponsCategory", WeaponCategoriesRoutes);

export { routesRouter };
