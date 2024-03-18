import Club from "../../../entities/Club";

export class DeleteClubUseCase {
  async execute(id: string) {
    const club = await Club.findById(id);

    if (!club) {
      throw new Error("Club ID: " + id + ", não encontrado no banco de dados!");
    }

    await club.deleteOne();

    return `Club ID: ${id}, deletado com sucesso!`;
  }
}
