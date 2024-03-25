import { admin } from "../../../config/firebase";
import User from "../../../entities/User";

export class DeleteUserUseCase {
  async execute(id: string) {
    const user = await User.findById(id);

    if (!user) {
      throw new Error(
        "Nenhum usuário encontrado referentes a essa id informada."
      );
    }

    if (user.photoPath) {
      const bucket = admin.storage().bucket();

      const file = bucket.file(user.photoPath);

      if (await file.exists()) {
        await file.delete();
      }
    }

    await user.deleteOne();
    return `Usuário: ${user.name}, deletado com sucesso!`;
  }
}
