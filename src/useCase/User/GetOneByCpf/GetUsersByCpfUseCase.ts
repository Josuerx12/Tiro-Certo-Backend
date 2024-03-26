import User from "../../../entities/User";

export class GetUsersByCpfUseCase {
  async execute(cpf: string) {
    const users = await User.findOne({
      cpf: cpf.replace(".", "").replace("-", "").trim(),
    }).select("-password");

    return users;
  }
}
