import User from "../../../entities/User";
import { IUser } from "../UserInterface";
import { multerFile } from "../../../config/Upload";
import { auth, deleteToDrive, uploadDrive } from "../../../config/GDrive";
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
        await auth().then((jwt) => deleteToDrive(jwt, user.photo));
      }

      await auth().then(
        async (jwt) =>
          await uploadDrive(jwt, file).then(
            async (data) =>
              await user.updateOne({ ...credentials, photo: data.id })
          )
      );
      return `Usuário: ${user.name}, editado com sucesso!`;
    }

    await user.updateOne(credentials);

    return `Usuário: ${user.name}, editado com sucesso!`;
  }
}
