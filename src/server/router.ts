import { Request, Response, Router } from "express";
import { authRoutes } from "./routes/Auth";
import { userRoutes } from "./routes/User";
import { ClubRoutes } from "./routes/Club";
import { AcervoRoute } from "./routes/Acervo";
import { ActivityRegisterRoutes } from "./routes/ActivityRegister";
import { WeaponCategoriesRoutes } from "./routes/WeaponCategory";
import { WeaponRoutes } from "./routes/Weapon";

const routesRouter = Router();

routesRouter.get("/", (req: Request, res: Response) =>
  res.send({ msg: "Tiro Facil Funcionando" })
);

routesRouter.use("/auth", authRoutes);
routesRouter.use("/users", userRoutes);
routesRouter.use("/clubs", ClubRoutes);
routesRouter.use("/acervo", AcervoRoute);
routesRouter.use("/activityRegisters", ActivityRegisterRoutes);
routesRouter.use("/weaponsCategories", WeaponCategoriesRoutes);
routesRouter.use("/weapons", WeaponRoutes);

export { routesRouter };
