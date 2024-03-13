import { Request, Response } from "express";
import { GetActivitiesRegisterUseCase } from "./GetActivitiesRegisterUseCase";

export class GetActivitiesRegisterController {
  constructor(
    private GetActivitiesRegisterUseCase: GetActivitiesRegisterUseCase
  ) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.GetActivitiesRegisterUseCase.execute(
      req.params.id
    );
    return res.send({ payload });
  };
}
