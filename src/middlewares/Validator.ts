import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

function validator(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
  }

  return res.status(401).json({ error: errors.mapped() });
}

export { validator };
