import { v4 } from "uuid";
import { dbx } from "../../../config/Dbox";
import { multerFile } from "../../../config/Upload";
import WeaponCategory from "../../../entities/WeaponCategory";

export class EditWeaponCategoryUseCase {
  async execute(id: string, name: string, logo: multerFile) {
    const weaponCategory = await WeaponCategory.findById(id);

    if (logo) {
      if (weaponCategory.logoPath) {
        await dbx.filesDeleteV2({ path: weaponCategory.logoPath });
      }
      await dbx
        .filesUpload({
          path: "/tirofacil/" + v4() + "." + logo.mimetype.split("/")[1],
          contents: logo.buffer,
        })
        .then(async (res) => {
          return await dbx.sharingCreateSharedLinkWithSettings({
            path: res.result.path_display,
          });
        })
        .then((res) => {
          weaponCategory.logoURL = res.result.url.replace(
            "www.dropbox.com",
            "dl.dropboxusercontent.com"
          );
          weaponCategory.logoPath = res.result.path_lower;
        });
    }

    if (name) {
      weaponCategory.name = name;
    }

    await weaponCategory.save();

    return `Categoria ${weaponCategory.name}, editada com sucesso!`;
  }
}
