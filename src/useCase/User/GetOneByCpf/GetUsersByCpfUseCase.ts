import User from "../../../entities/User";

export class GetUsersByCpfUseCase {
  async execute(cpf: string) {
    console.log(cpf);
    const users = await User.findOne({
      cpf: String(cpf).replace(".", "").replace("-", "").trim(),
    }).select("-password");

    return users;
  }
}
