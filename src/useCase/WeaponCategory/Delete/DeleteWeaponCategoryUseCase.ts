import { dbx } from "../../../config/Dbox";
import WeaponCategory from "../../../entities/WeaponCategory";

export class DeleteWeaponCategoryUseCase {
  async execute(id: String) {
    const existingCategory = await WeaponCategory.findById(id);

    if (!existingCategory) {
      throw new Error(
        "Nenhuma categoria de arma encontrada referente a ID: " + id
      );
    }

    await dbx.filesDeleteV2({ path: existingCategory.logoPath });

    await existingCategory.deleteOne();

    return `Categoria ID: ${id}, deletada com sucesso!`;
  }
}
