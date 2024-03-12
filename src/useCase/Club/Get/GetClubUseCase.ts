import Club from "../../../entities/Club";

export class GetClubUseCase {
  async execute(id: string) {
    const club = await Club.findById(id);

    return club;
  }
}
