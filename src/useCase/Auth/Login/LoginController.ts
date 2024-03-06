import { Request, Response } from "express";
import { LoginUseCase } from "./LoginUseCase";

export class LoginController {
  constructor(private LoginUseCase: LoginUseCase) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.LoginUseCase.execute(req.body);

    return res.status(200).json({ payload });
  };
}
