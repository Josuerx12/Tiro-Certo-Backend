import { Request, Response } from "express";
import RegisterUseCase from "./RegisterUseCase";

export class RegisterController {
  constructor(private RegisterUseCase: RegisterUseCase) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.RegisterUseCase.execute(req.body);
    return res.status(201).json({ payload });
  };
}
