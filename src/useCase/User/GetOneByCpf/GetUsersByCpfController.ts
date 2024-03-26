import { Request, Response } from "express";
import { GetUsersByCpfUseCase } from "./GetUsersByCpfUseCase";

export class GetUsersByCpfController {
  constructor(private GetUsersByCpfUseCase: GetUsersByCpfUseCase) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.GetUsersByCpfUseCase.execute(req.params.cpf);

    return res.send({ payload });
  };
}
