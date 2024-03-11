import { Request, Response } from "express";
import { EditAcervoUseCase } from "./EditAcervoUseCase";

export class EditAcervoController {
  constructor(private EditAcervoUseCase: EditAcervoUseCase) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.EditAcervoUseCase.execute(req.user, req.body);

    return res.status(200).json({ payload });
  };
}
