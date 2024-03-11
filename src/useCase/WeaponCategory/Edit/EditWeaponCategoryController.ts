import { Request, Response } from "express";
import { EditWeaponCategoryUseCase } from "./EditWeaponCategoryUseCase";

export class EditWeaponCategoryController {
  constructor(private EditWeaponCategoryUseCase: EditWeaponCategoryUseCase) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.EditWeaponCategoryUseCase.execute(
      req.params.id,
      req.body.name,
      req.file
    );

    return res.status(200).json({ payload });
  };
}
