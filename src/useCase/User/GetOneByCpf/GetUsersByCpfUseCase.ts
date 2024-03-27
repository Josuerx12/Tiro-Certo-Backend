import User from "../../../entities/User";

export class GetUsersByCpfUseCase {
  async execute(cpf: string) {
    console.log(cpf);
    const user = await User.findOne({
      cpf: String(cpf).replace(".", "").replace("-", "").trim(),
    }).select("-password");

    if (!user) {
      throw new Error("Nenhum usuário encontrado para esse cpf.");
    }

    return user;
  }
}
