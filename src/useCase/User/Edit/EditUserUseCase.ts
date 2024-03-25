import User from "../../../entities/User";
import { IUser } from "../UserInterface";
import { v4 } from "uuid";
import { genSalt, hash } from "bcryptjs";
import { admin } from "../../../config/firebase";

type EditUserCredentials = {
  name: string;
  email: string;
  cpf: Number;
  cr: number | null;
  ["profile-pic"]: Express.Multer.File;
  admin: boolean;
  founder: boolean;
  password: string;
  confirmPassword: string;
};

export class EditUserUseCase {
  async execute(
    id: string,
    credentials: EditUserCredentials,
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
      const bucket = admin.storage().bucket();

      file.originalname = v4() + "." + file.mimetype.split("/")[1];

      const permitedFiles = ["image/jpeg", "image/jpg", "image/png"];

      if (!permitedFiles.includes(file.mimetype)) {
        throw new Error("Imagens devem ser no formato: jpeg, jpg ou png!");
      }

      if (user.photoPath) {
        const fileFirebase = bucket.file(user.photoPath);

        const existFile = await fileFirebase.exists();

        if (!existFile[0]) {
          await fileFirebase.delete();
        }
      }

      const fileToUpload = bucket.file(file.originalname);

      await fileToUpload.save(file.buffer);

      user.photoURL = fileToUpload.publicUrl();
      user.photoPath = file.originalname;

      await user.save();
    }

    if (credentials.password) {
      const salt = await genSalt(10);
      const passHash = await hash(credentials.password, salt);
      await user.updateOne({ ...credentials, password: passHash });
      return `Usuário: ${user.name}, editado com sucesso!`;
    }

    await user.updateOne(credentials);

    return `Usuário: ${user.name}, editado com sucesso!`;
  }
}
