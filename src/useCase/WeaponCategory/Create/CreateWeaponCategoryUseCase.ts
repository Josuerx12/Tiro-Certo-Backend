import { auth, uploadDrive } from "../../../config/GDrive";
import { multerFile } from "../../../config/Upload";
import { v4 } from "uuid";
import WeaponCategory from "../../../entities/WeaponCategory";

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

    await auth().then(
      async (token) =>
        await uploadDrive(token, logo).then(
          async (res) =>
            await WeaponCategory.create({
              name,
              logo: res.id,
            })
        )
    );

    return `Categoria ${name}, criada com sucesso!`;
  }
}
