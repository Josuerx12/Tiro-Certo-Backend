import User from "../../../entities/User";
import { IUser } from "../UserInterface";
import { multerFile } from "../../../config/Upload";
import { dbx } from "../../../config/Dbox";
import { v4 } from "uuid";

export class EditUserUseCase {
  async execute(id: string, credentials: IUser, file?: multerFile) {
    const user = await User.findById(id);
    if (file) {
      file.originalname = v4() + "." + file.mimetype.split("/")[1];

      const permitedFiles = ["image/jpeg", "image/jpg", "image/png"];

      if (!permitedFiles.includes(file.mimetype)) {
        throw new Error("Imagens devem ser no formato: jpeg, jpg ou png!");
      }

      if (user.photo) {
      }

      return `Usuário: ${user.name}, editado com sucesso!`;
    }

    await user.updateOne(credentials);

    return `Usuário: ${user.name}, editado com sucesso!`;
  }
}
