import { Request, Response } from "express";
import { GetActivityRegisterUseCase } from "./GetActivityRegisterUseCase";

export class GetActivityRegisterController {
  constructor(private GetActivityRegisterUseCase: GetActivityRegisterUseCase) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.GetActivityRegisterUseCase.execute(
      req.params.id,
      req.user
    );
    return res.send({ payload });
  };
}
