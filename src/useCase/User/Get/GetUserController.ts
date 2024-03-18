import { Request, Response } from "express";
import { IUser } from "../UserInterface";

export class GetUserController {
  async handle(req: Request, res: Response) {
    const payload = req.user as IUser;

    return res.send({ payload });
  }
}
