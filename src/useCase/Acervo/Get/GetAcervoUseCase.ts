import Acervo from "../../../entities/Acervo";
import { IUser } from "../../User/UserInterface";

export class GetAcervoUseCase {
  async execute(user: IUser) {
    const acervo = await Acervo.findOne({ userID: user._id });

    if (!acervo) {
      throw new Error(
        "Nenhum acervo encontrado para seu usuário entre em contato com o suporte!"
      );
    }

    return acervo;
  }
}
