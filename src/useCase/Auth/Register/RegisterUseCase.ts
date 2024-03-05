import { uuid } from "uuidv4";
import User from "../../../entities/User";
import { IRegisterDTO } from "./RegisterDTO";
import { genSalt, hash } from "bcryptjs";

export class RegisterUseCase {
  exec = async (credentials: IRegisterDTO) => {
    const salt = await genSalt(10);
    const passHash = await hash(credentials.password, salt);

    const user = await User.create({
      ...credentials,
      uid: uuid(),
      password: passHash,
    });

    console.log(user);

    return `Usuário ${user.name}, criado com sucesso!`;
  };
}
