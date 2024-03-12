import { Request, Response } from "express";
import { DeleteClubUseCase } from "./DeleteClubUseCase";

export class DeleteClubController {
  constructor(private DeleteClubUseCase: DeleteClubUseCase) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.DeleteClubUseCase.execute(req.params.id);

    return res.status(200).json({ payload });
  };
}
