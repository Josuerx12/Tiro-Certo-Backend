import ActivityRegister from "../../../entities/ActivityRegister";

export class GetActivitiesRegisterUseCase {
  async execute() {
    const activityRegister = await ActivityRegister.find();
    return activityRegister;
  }
}
