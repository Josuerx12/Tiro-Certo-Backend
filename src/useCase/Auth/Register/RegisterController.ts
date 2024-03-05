import { Request, Response } from "express";
import { RegisterUseCase } from "./RegisterUseCase";

export class RegisterController {
  constructor(private RegisterUseCase: RegisterUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const payload = await this.RegisterUseCase.exec(req.body);
      return res.status(201).send({ payload });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ error: "Erro ao processar a solicitação." });
    }
  }
}
