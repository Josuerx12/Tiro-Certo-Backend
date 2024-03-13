import { NextFunction, Request, Response } from "express";

export class PowerGuard {
  founder(req: Request, res: Response, next: NextFunction) {
    if (!req.user.founder) {
      throw new Error(
        "Apenas o fundador tem permição para executar essa ação!"
      );
    }
    next();
  }
  adminAndFounder(req: Request, res: Response, next: NextFunction) {
    if (!req.user.founder && !req.user.admin) {
      throw new Error(
        "Apenas o administradores e o fundador tem permição para executar essa ação!"
      );
    }
    next();
  }
}
