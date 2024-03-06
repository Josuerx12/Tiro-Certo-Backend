import { Request, Response } from "express";

export class GetUserController {
  handle(req: Request, res: Response) {
    const payload = req.user;

    return res.status(200).json({ payload });
  }
}
