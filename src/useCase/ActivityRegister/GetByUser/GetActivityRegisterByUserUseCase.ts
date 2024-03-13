import ActivityRegister from "../../../entities/ActivityRegister";
import { IUser } from "../../User/UserInterface";

export class GetActivityRegisterByUserUseCase {
  async execute(user: IUser) {
    const activitiesRegister = await ActivityRegister.find({
      ownerID: user._id,
    });

    if (!activitiesRegister) {
      throw new Error(
        "Nenhuma atividade encontrada para o usuário: " + user.name + "!"
      );
    }

    return activitiesRegister;
  }
}
