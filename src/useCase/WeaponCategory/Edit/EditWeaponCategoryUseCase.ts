import { multerFile } from "../../../config/Upload";
import { auth, deleteToDrive, uploadDrive } from "../../../config/GDrive";
import WeaponCategory from "../../../entities/WeaponCategory";

export class EditWeaponCategoryUseCase {
  async execute(id: string, name: string, logo: multerFile) {
    const weaponCategory = await WeaponCategory.findById(id);

    if (logo) {
      if (weaponCategory.logo) {
        await auth().then(
          async (token) => await deleteToDrive(token, weaponCategory.logo)
        );
      }
      await auth().then(
        async (token) =>
          await uploadDrive(token, logo).then(
            async (res) => (weaponCategory.logo = res.id)
          )
      );
    }

    weaponCategory.name = name;

    await weaponCategory.save();

    return `Categoria ${weaponCategory.name}, editada com sucesso!`;
  }
}
