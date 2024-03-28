import User from "../../../entities/User";

export class GetUsersByCpfUseCase {
  async execute(cpf: string) {
    cpf.replace(/\D/g, "").trim();
    const user = await User.findOne({
      cpf,
    }).select("-password");

    if (!user) {
      throw new Error("Nenhum usuário encontrado para esse cpf.");
    }

    return user;
  }
}
