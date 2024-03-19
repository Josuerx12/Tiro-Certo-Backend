import User from "../../../entities/User";
import { dbx } from "../../../config/Dbox";

export class DeleteUserUseCase {
  async execute(id: string) {
    const user = await User.findById(id);

    if (!user) {
      throw new Error(
        "Nenhum usuário encontrado referentes a essa id informada."
      );
    }

    if (user.photoPath) {
      await dbx.filesDeleteV2({ path: user.photoPath });
    }

    await user.deleteOne();
    return `Usuário: ${user.name}, deletado com sucesso!`;
  }
}
