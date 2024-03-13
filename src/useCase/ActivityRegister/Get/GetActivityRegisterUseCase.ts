import ActivityRegister from "../../../entities/ActivityRegister";

export class GetActivityRegisterUseCase {
  async execute(id: string) {
    const activityRegister = await ActivityRegister.findById(id);

    if (!activityRegister) {
      throw new Error("Nenhuma atividade encontrado com o ID: " + id + "!");
    }

    return activityRegister;
  }
}
