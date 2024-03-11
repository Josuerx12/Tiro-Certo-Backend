import { Request, Response } from "express";
import { CreateWeaponCategoryUseCase } from "./CreateWeaponCategoryUseCase";

export class CreateWeaponCategoryController {
  constructor(
    private CreateWeaponCategoryServiceUseCase: CreateWeaponCategoryUseCase
  ) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.CreateWeaponCategoryServiceUseCase.execute(
      req.body.name,
      req.file
    );
    return res.status(201).json({ payload });
  };
}
