import { v4 } from "uuid";
import { multerFile } from "../../../config/Upload";
import WeaponCategory from "../../../entities/WeaponCategory";
import { admin } from "../../../config/firebase";

export class EditWeaponCategoryUseCase {
  async execute(id: string, name: string, logo: multerFile) {
    const weaponCategory = await WeaponCategory.findById(id);

    if (logo) {
      logo.originalname = v4() + "." + logo.mimetype.split("/")[1];

      const bucket = admin.storage().bucket();

      if (weaponCategory.logoPath) {
        const oldFile = bucket.file(weaponCategory.logoPath);

        if (await oldFile.exists()) {
          await oldFile.delete();
        }
      }

      const newFile = bucket.file(logo.originalname);

      await newFile.save(logo.buffer);
    }

    if (name) {
      weaponCategory.name = name;
    }

    await weaponCategory.save();

    return `Categoria ${weaponCategory.name}, editada com sucesso!`;
  }
}
