import { Request, Response } from "express";
import { CreateActivityRegisterUseCase } from "./CreateActivityRegisterUseCase";

export class CreateActivityRegisterController {
  constructor(
    private CreateActivityRegisterUseCase: CreateActivityRegisterUseCase
  ) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.CreateActivityRegisterUseCase.execute(
      req.body,
      req.user
    );

    return res.status(201).json({ payload });
  };
}
