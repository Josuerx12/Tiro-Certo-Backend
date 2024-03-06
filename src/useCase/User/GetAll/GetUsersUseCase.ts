import User from "../../../entities/User";

export class GetUsersUseCase {
  async execute() {
    const users = await User.find().select("-password");

    return users;
  }
}
