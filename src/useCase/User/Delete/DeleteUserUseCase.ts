import User from "../../../entities/User";

export class DeleteUserUseCase {
  async execute(id: string) {
    const user = await User.findById(id);

    if (!user) {
      throw new Error(
        "Nenhum usuário encontrado referentes a essa id informada."
      );
    }

    await user.deleteOne();
    return `Usuário: ${user.name}, deletado com sucesso!`;
  }
}
