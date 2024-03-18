import { unlink } from "fs";
import User from "../../../entities/User";
import path from "path";
import Acervo from "../../../entities/Acervo";

export class DeleteUserUseCase {
  async execute(id: string) {
    const user = await User.findById(id);

    if (!user) {
      throw new Error(
        "Nenhum usuário encontrado referentes a essa id informada."
      );
    }

    await Acervo.findOneAndDelete({ userid: user._id });

    await user.deleteOne();
    return `Usuário: ${user.name}, deletado com sucesso!`;
  }
}
