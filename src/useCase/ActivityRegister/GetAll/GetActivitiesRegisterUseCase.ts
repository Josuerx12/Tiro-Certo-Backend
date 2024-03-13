import ActivityRegister from "../../../entities/ActivityRegister";

export class GetActivitiesRegisterUseCase {
  async execute(id: string) {
    const activityRegister = await ActivityRegister.find();
    return activityRegister;
  }
}
