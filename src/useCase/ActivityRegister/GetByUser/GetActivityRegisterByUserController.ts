import { Request, Response } from "express";
import { GetActivityRegisterByUserUseCase } from "./GetActivityRegisterByUserUseCase";

export class GetActivityRegisterByUserController {
  constructor(
    private GetActivityRegisterByUserUseCase: GetActivityRegisterByUserUseCase
  ) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.GetActivityRegisterByUserUseCase.execute(
      req.user
    );
    return res.send({ payload });
  };
}
