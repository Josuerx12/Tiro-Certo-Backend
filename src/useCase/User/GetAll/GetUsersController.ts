import { Request, Response } from "express";
import { GetUsersUseCase } from "./GetUsersUseCase";

export class GetUsersController {
  constructor(private GetUsersUseCase: GetUsersUseCase) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.GetUsersUseCase.execute();

    return res.status(200).json({ payload });
  };
}
