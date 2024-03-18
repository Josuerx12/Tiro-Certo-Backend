import { multerFile } from "../../../config/Upload";
import { v4 } from "uuid";
import WeaponCategory from "../../../entities/WeaponCategory";
import { dbx } from "../../../config/Dbox";

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

    await dbx
      .filesUpload({
        path: "/tirofacil/" + logo.originalname,
        contents: logo.buffer,
      })
      .then(
        async (res) =>
          await WeaponCategory.create({
            _id: v4(),
            logo: res.result.path_display,
            name,
          })
      );

    return `Categoria ${name}, criada com sucesso!`;
  }
}
