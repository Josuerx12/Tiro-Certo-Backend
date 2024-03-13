import { Request, Response } from "express";
import { CreateWeaponUseCase } from "./CreateWeaponUseCase";

export class CreateWeaponController {
  constructor(private CreateWeaponUseCase: CreateWeaponUseCase) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.CreateWeaponUseCase.execute(req.body, req.user);

    return res.status(201).json({ payload });
  };
}
