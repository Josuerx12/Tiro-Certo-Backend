import { v4 as uuidv4, v4 } from "uuid";
import User from "../../../entities/User";
import { IRegisterDTO } from "./RegisterDTO";
import { genSalt, hash } from "bcryptjs";
import { admin } from "../../../config/firebase";

export default class RegisterUseCase {
  async execute(credentials: IRegisterDTO, photo: Express.Multer.File) {
    const salt = await genSalt(10);
    const passHash = await hash(credentials.password, salt);

    const user = await User.create({
      ...credentials,
      _id: uuidv4(),
      password: passHash,
      cpf: credentials.cpf.replace(/\D/g, "").trim(),
    });

    if (photo) {
      const bucket = admin.storage().bucket();

      photo.originalname = v4() + "." + photo.mimetype.split("/")[1];

      const file = bucket.file(photo.originalname);

      await file.save(photo.buffer);

      user.photoURL = file.publicUrl();
      user.photoPath = photo.originalname;

      await user.save();
    }

    return `Usuário ${user.name}, criado com sucesso!`;
  }
}
