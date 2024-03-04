import { Request, Response, NextFunction } from "express";

function ErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err.message);

  res.status(501).json({ error: err.message });
}

export { ErrorHandler };
