import { dbx } from "../../../config/Dbox";
import WeaponCategory from "../../../entities/WeaponCategory";

export class GetAllWeaponCategoryUseCase {
  async execute() {
    const allCategories = await WeaponCategory.find();
    const allCategoriesWithImgLinks = allCategories.map(async (category) => {
      const imgLinks = await dbx.sharingCreateSharedLinkWithSettings({
        path: category.logo,
      });
      category.logo = imgLinks.result.url;
      return category;
    });
    return allCategoriesWithImgLinks;
  }
}
