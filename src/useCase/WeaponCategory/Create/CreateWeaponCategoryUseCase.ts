import { multerFile } from "../../../config/Upload";
import { v4 } from "uuid";
import WeaponCategory from "../../../entities/WeaponCategory";
import { admin } from "../../../config/firebase";

export class CreateWeaponCategoryUseCase {
  async execute(name: string, logo: multerFile) {
    if (!logo) {
      throw new Error("Nenhuma logo informada para categoria!");
    }

    logo.originalname = v4() + "." + logo.mimetype.split("/")[1];

    const permitedFiles = ["image/jpeg", "image/jpg", "image/png"];

    if (!permitedFiles.includes(logo.mimetype)) {
      throw new Error("Imagens devem ser no formato: jpeg, jpg ou png!");
    }

    const bucket = admin.storage().bucket();

    const file = bucket.file(logo.originalname);

    await file.save(logo.buffer).then(
      async (res) =>
        await WeaponCategory.create({
          _id: v4(),
          logoURL: file.publicUrl(),
          logoPath: logo.originalname,
          name,
        })
    );

    return `Categoria ${name}, criada com sucesso!`;
  }
}
