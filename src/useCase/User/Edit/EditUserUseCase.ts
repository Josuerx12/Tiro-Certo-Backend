import User from "../../../entities/User";
import { IUser } from "../UserInterface";
import { dbx } from "../../../config/Dbox";
import { v4 } from "uuid";

export class EditUserUseCase {
  async execute(
    id: string,
    credentials: IUser,
    userLogged: IUser,
    file?: Express.Multer.File
  ) {
    if (!userLogged.founder && !userLogged.admin && userLogged._id !== id) {
      throw new Error("Você não é autorizado a fazer está edição!");
    }
    if (
      !userLogged.founder &&
      !userLogged.admin &&
      (credentials.admin || credentials.founder)
    ) {
      throw new Error(
        "Você não tem permissão para se tornar um administrador!"
      );
    }

    const user = await User.findById(id);
    if (file) {
      file.originalname = v4() + "." + file.mimetype.split("/")[1];

      const permitedFiles = ["image/jpeg", "image/jpg", "image/png"];

      if (!permitedFiles.includes(file.mimetype)) {
        throw new Error("Imagens devem ser no formato: jpeg, jpg ou png!");
      }

      if (user.photoPath) {
        await dbx.filesDeleteV2({ path: user.photoPath });
      }

      await dbx
        .filesUpload({
          path: "/tirofacil/" + v4() + "." + file.mimetype.split("/")[1],
          contents: file.buffer,
        })
        .then(
          async (res) =>
            await dbx.sharingCreateSharedLinkWithSettings({
              path: res.result.path_display,
            })
        )
        .then((res) => {
          user.photoURL = res.result.url.replace(
            "www.dropbox.com",
            "dl.dropboxusercontent.com"
          );
          user.photoPath = res.result.path_lower;
        });
      await user.save();

      await user.updateOne(credentials);

      return `Usuário: ${user.name}, editado com sucesso!`;
    }

    await user.updateOne(credentials);

    return `Usuário: ${user.name}, editado com sucesso!`;
  }
}
