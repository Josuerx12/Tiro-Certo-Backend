import { Request, Response } from "express";
import { DeleteWeaponFromAcervoUseCase } from "./DeleteWeaponFromAcervoUseCase";

export class DeleteWeaponFromAcervoController {
  constructor(
    private DeleteWeaponFromAcervoUseCase: DeleteWeaponFromAcervoUseCase
  ) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.DeleteWeaponFromAcervoUseCase.execute(
      req.user,
      req.params.id
    );

    return res.status(200).json({ payload });
  };
}
