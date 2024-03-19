import { Request, Response } from "express";
import { GetAcervoUseCase } from "./GetAcervoUseCase";

export class GetAcervoController {
  constructor(private GetAcervoUseCase: GetAcervoUseCase) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.GetAcervoUseCase.execute(req.user);
    return res.send({ payload });
  };
}
