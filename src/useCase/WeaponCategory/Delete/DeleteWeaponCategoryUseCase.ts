import { admin } from "../../../config/firebase";
import WeaponCategory from "../../../entities/WeaponCategory";

export class DeleteWeaponCategoryUseCase {
  async execute(id: String) {
    const existingCategory = await WeaponCategory.findById(id);

    if (!existingCategory) {
      throw new Error(
        "Nenhuma categoria de arma encontrada referente a ID: " + id
      );
    }

    const bucket = admin.storage().bucket();

    const oldFile = bucket.file(existingCategory.logoPath);
    const oldFileExists = await oldFile.exists();
    if (oldFileExists[0]) {
      await oldFile.delete();
    }

    await existingCategory.deleteOne();

    return `Categoria ID: ${id}, deletada com sucesso!`;
  }
}
