import { Request, Response } from "express";
import { GetAllClubUseCase } from "./GetAllClubUseCase";

export class GetAllClubController {
  constructor(private GetAllClubUseCase: GetAllClubUseCase) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.GetAllClubUseCase.execute();

    return res.send({ payload });
  };
}
