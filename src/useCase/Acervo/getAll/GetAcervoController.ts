import { Request, Response } from "express";
import { GetAllAcervoUseCase } from "./GetAcervoUseCase";

export class GetAllAcervoController {
  constructor(private GetAllAcervoUseCase: GetAllAcervoUseCase) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.GetAllAcervoUseCase.execute();
    return res.send({ payload });
  };
}
