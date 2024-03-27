import ActivityRegister from "../../../entities/ActivityRegister";
import User from "../../../entities/User";
import { IUser } from "../../User/UserInterface";

export class GetActivityRegisterByUserIdUseCase {
  async execute(userId: string) {
    const user = await User.findById(userId);

    const activitiesRegister = await ActivityRegister.find({
      ownerID: userId,
    });

    if (!activitiesRegister) {
      throw new Error(
        "Nenhuma atividade encontrada para o usuário: " + user.name + "!"
      );
    }

    return activitiesRegister;
  }
}
