import { admin } from "../../../config/firebase";
import Club from "../../../entities/Club";

export class DeleteClubUseCase {
  async execute(id: string) {
    const club = await Club.findById(id);

    if (!club) {
      throw new Error("Club ID: " + id + ", não encontrado no banco de dados!");
    }

    if (club.logoPath) {
      const bucket = admin.storage().bucket();

      const file = bucket.file(club.logoPath);

      const fileExist = await file.exists();

      if (fileExist[0]) {
        await file.delete();
      }
    }

    await club.deleteOne();

    return `Club ID: ${id}, deletado com sucesso!`;
  }
}
