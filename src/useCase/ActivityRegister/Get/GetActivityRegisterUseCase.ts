import ActivityRegister from "../../../entities/ActivityRegister";
import { IUser } from "../../User/UserInterface";

export class GetActivityRegisterUseCase {
  async execute(id: string, user: IUser) {
    const activityRegister = await ActivityRegister.findById(id);

    if (!activityRegister) {
      throw new Error("Nenhuma atividade encontrado com o ID: " + id + "!");
    }

    if (activityRegister.ownerID !== user._id && !user.admin && !user.founder) {
      throw new Error("Você não tem permissão para acessar está atividade!");
    }

    return activityRegister;
  }
}
