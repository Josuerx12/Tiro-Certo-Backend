import Club from "../../../entities/Club";

export class GetAllClubUseCase {
  async execute() {
    const clubs = await Club.find();

    return clubs;
  }
}
