import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

function validator(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).json({ error: errors.mapped() });
  }
  next();
}

export { validator };
