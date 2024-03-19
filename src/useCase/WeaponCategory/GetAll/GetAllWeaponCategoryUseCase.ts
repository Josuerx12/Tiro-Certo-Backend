import WeaponCategory from "../../../entities/WeaponCategory";

export class GetAllWeaponCategoryUseCase {
  async execute() {
    const allCategories = await WeaponCategory.find();

    return allCategories;
  }
}
