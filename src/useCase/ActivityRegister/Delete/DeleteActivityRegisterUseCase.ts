import ActivityRegister from "../../../entities/ActivityRegister";

export class DeleteActivityRegisterUseCase {
  async execute(id: string) {
    const activityRegister = await ActivityRegister.findById(id);

    if (!activityRegister) {
      throw new Error("Nenhuma atividade encontrado com o ID: " + id + "!");
    }

    await activityRegister.deleteOne();
  }
}
