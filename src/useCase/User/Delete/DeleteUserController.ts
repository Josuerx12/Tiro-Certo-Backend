import { Request, Response } from "express";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
  constructor(private DeleteUserUseCase: DeleteUserUseCase) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.DeleteUserUseCase.execute(req.params.id);
    return res.status(200).json({ payload });
  };
}
