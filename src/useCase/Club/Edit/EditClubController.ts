import { Request, Response } from "express";
import { EditClubUseCase } from "./EditClubUseCase";

export class EditClubController {
  constructor(private EditClubUseCase: EditClubUseCase) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.EditClubUseCase.execute(
      req.params.id,
      req.body,
      req.file
    );

    return res.status(201).json({ payload });
  };
}
