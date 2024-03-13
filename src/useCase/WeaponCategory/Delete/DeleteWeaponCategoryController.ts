import { Request, Response } from "express";
import { DeleteWeaponCategoryUseCase } from "./DeleteWeaponCategoryUseCase";

export class DeleteWeaponCategoryController {
  constructor(
    private DeleteWeaponCategoryUseCase: DeleteWeaponCategoryUseCase
  ) {}

  handle = async (req: Request, res: Response) => {
    const payload = this.DeleteWeaponCategoryUseCase.execute(req.params.id);
    return res.status(200).json({ payload });
  };
}
