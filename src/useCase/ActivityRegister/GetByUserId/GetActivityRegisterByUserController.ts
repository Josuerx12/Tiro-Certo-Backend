import { Request, Response } from "express";
import { GetActivityRegisterByUserIdUseCase } from "./GetActivityRegisterByUserUseCase";

export class GetActivityRegisterByUserIdController {
  constructor(
    private GetActivityRegisterByUserIdUseCase: GetActivityRegisterByUserIdUseCase
  ) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.GetActivityRegisterByUserIdUseCase.execute(
      req.params.userId
    );
    return res.send({ payload });
  };
}
