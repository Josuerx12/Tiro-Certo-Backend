import User from "../../../entities/User";
import { IUser } from "../UserInterface";
import { multerFile } from "../../../config/Upload";
import { unlink } from "fs";
import path from "path";

export class EditUserUseCase {
  async execute(id: string, credentials: IUser, file?: multerFile) {
    const user = await User.findById(id);
    if (file) {
      const permitedFiles = ["image/jpeg", "image/jpg", "image/png"];

      if (!permitedFiles.includes(file.mimetype)) {
        unlink(
          path.join(__dirname, "..", "..", "..", "images/") + file.fieldname,
          (err) => {
            if (err) {
              throw err;
            }
          }
        );
        throw new Error("Imagens devem ser no formato: jpeg, jpg ou png!");
      }

      if (user.photo) {
        unlink(
          path.join(__dirname, "..", "..", "..", "images/") + user.photo,
          (err) => {
            if (err) {
              throw err;
            }
          }
        );
      }

      await user.updateOne({ ...credentials, photo: file.fieldname });
    }

    await user.updateOne(credentials);

    return `Usuário: ${user.name}, editado com sucesso!`;
  }
}
