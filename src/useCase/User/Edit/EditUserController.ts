import { Request, Response } from "express";
import { EditUserUseCase } from "./EditUserUseCase";

export class EditUserController {
  constructor(private EditUSerUseCase: EditUserUseCase) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.EditUSerUseCase.execute(
      req.params.id,
      req.body,
      req.user,
      req.file
    );

    return res.status(200).json({ payload });
  };
}
