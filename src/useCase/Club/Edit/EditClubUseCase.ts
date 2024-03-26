import { v4 } from "uuid";
import { multerFile } from "../../../config/Upload";
import Club from "../../../entities/Club";
import { IEditClubDTO } from "./EditClubDTO";
import { admin } from "../../../config/firebase";

export class EditClubUseCase {
  hasDuplicateUsers(
    clubUsers: string[] | [],
    newUsers: string[] | []
  ): boolean {
    if (!clubUsers || !newUsers) {
      return false;
    }

    const clubUsersUnique = new Set(clubUsers.map((user) => user));

    for (const user of newUsers) {
      if (clubUsersUnique.has(user)) {
        return true;
      }
    }

    return false;
  }

  async execute(id: string, credentials: IEditClubDTO, logo: multerFile) {
    const club = await Club.findById(id);

    if (this.hasDuplicateUsers(club.users, credentials.users)) {
      throw new Error("Usuário já cadastrado ao club!");
    }

    if (logo) {
      logo.originalname = v4() + "." + logo.mimetype.split("/")[1];

      const bucket = admin.storage().bucket();

      if (club.logoPath) {
        const oldFile = bucket.file(club.logoPath);

        const oldFileExists = await oldFile.exists();

        if (oldFileExists[0]) {
          await oldFile.delete();
        }
      }

      const newFile = bucket.file(logo.originalname);

      await newFile.save(logo.buffer);

      club.logoURL = newFile.publicUrl();
      club.logoPath = logo.originalname;

      await club.save();
    }

    await club.updateOne(credentials);
    return `Club ${club.name}, editado com sucesso!`;
  }
}
