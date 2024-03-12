import { Request, Response } from "express";
import { CreateClubUseCase } from "./CreateClubUseCase";

export class CreateClubController {
  constructor(private CreateClubUseCase: CreateClubUseCase) {}

  handle = async (req: Request, res: Response) => {
    const payload = this.CreateClubUseCase.execute(req.body, req.file);

    return res.status(201).json({ payload });
  };
}
