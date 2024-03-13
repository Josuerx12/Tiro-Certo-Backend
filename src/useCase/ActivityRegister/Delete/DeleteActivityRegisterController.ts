import { Request, Response } from "express";
import { DeleteActivityRegisterUseCase } from "./DeleteActivityRegisterUseCase";

export class DeleteActivityRegisterController {
  constructor(
    private DeleteActivityRegisterUseCase: DeleteActivityRegisterUseCase
  ) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.DeleteActivityRegisterUseCase.execute(
      req.params.id
    );
    return res.status(200).json({ payload });
  };
}
