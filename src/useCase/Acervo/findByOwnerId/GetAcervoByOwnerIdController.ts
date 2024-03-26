import { Request, Response } from "express";
import { GetAcervoByOwnerIdUseCase } from "./GetAcervoByOwnerIdUseCase";

export class GetAcervoByOwnerIdController {
  constructor(private GetAcervoByOwnerIdUseCase: GetAcervoByOwnerIdUseCase) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.GetAcervoByOwnerIdUseCase.execute(
      req.params.userId
    );
    return res.send({ payload });
  };
}
