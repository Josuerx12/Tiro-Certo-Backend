import { Request, Response } from "express";
import { GetAllWeaponCategoryUseCase } from "./GetAllWeaponCategoryUseCase";

export class GetAllWeaponCategoryController {
  constructor(
    private GetAllWeaponCategoryUseCase: GetAllWeaponCategoryUseCase
  ) {}

  handle = async (req: Request, res: Response) => {
    const payload = await this.GetAllWeaponCategoryUseCase.execute();
    return res.send({ payload });
  };
}
