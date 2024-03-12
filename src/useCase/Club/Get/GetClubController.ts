import { Request, Response } from "express";
import { GetClubUseCase } from "./GetClubUseCase";

export class GetClubController {
  constructor(private GetClubUseCase: GetClubUseCase) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.GetClubUseCase.execute(req.params.id);

    return res.send({ payload });
  };
}
