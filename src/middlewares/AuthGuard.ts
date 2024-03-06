import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import User from "../entities/User";
import { IUser } from "../useCase/User/UserInterface";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

function AuthGuard(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    throw new Error("Nenhum token informado!");
  }

  verify(token, process.env.SECRET, async (err, decodedToken) => {
    if (err) {
      throw new Error("Token invalido!");
    }

    const user = (await User.findById(decodedToken).select(
      "-password"
    )) as IUser;

    req.user = user;

    next();
  });
}

export { AuthGuard };
