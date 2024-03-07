import { v4 as uuidv4 } from "uuid";
import User from "../../../entities/User";
import { IRegisterDTO } from "./RegisterDTO";
import { genSalt, hash } from "bcryptjs";
import Acervo from "../../../entities/Acervo";

export default class RegisterUseCase {
  async execute(credentials: IRegisterDTO) {
    const salt = await genSalt(10);
    const passHash = await hash(credentials.password, salt);

    const user = await User.create({
      ...credentials,
      _id: uuidv4(),
      password: passHash,
      cpf: Number(credentials.cpf.replace(".", "")),
      founder: false,
      admin: false,
      supervisor: false,
    });

    await Acervo.create({ userID: user._id });

    return `Usuário ${user.name}, criado com sucesso!`;
  }
}
