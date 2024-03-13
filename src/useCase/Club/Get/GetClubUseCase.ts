import Club from "../../../entities/Club";

export class GetClubUseCase {
  async execute(id: string) {
    const club = await Club.findById(id);

    if (!club) {
      throw new Error("Nenhum club com o ID: " + id + ", encontrado!");
    }

    return club;
  }
}
