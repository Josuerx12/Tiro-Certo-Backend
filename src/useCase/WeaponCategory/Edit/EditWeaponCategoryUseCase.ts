import { multerFile } from "../../../config/Upload";
import WeaponCategory from "../../../entities/WeaponCategory";

export class EditWeaponCategoryUseCase {
  async execute(id: string, name: string, logo: multerFile) {
    const weaponCategory = await WeaponCategory.findById(id);

    if (logo) {
    }

    weaponCategory.name = name;

    await weaponCategory.save();

    return `Categoria ${weaponCategory.name}, editada com sucesso!`;
  }
}
