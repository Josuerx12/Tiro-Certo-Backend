import { v4 } from "uuid";
import { dbx } from "../../../config/Dbox";
import { multerFile } from "../../../config/Upload";
import Club from "../../../entities/Club";
import { IEditClubDTO } from "./EditClubDTO";

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
      if (club.logoPath) {
        await dbx.filesDeleteV2({ path: club.logoPath });
      }

      await dbx
        .filesUpload({
          path: "/tirofacil/" + v4() + "." + logo.mimetype.split("/")[1],
        })
        .then(
          async (res) =>
            await dbx.sharingCreateSharedLinkWithSettings({
              path: res.result.path_lower,
            })
        )
        .then((res) => {
          club.logoPath = res.result.path_lower;
          club.logoURL = res.result.url.replace(
            "www.dropbox.com",
            "dl.dropboxusercontent.com"
          );
        });
      await club.save();
    }

    await club.updateOne(credentials);
    return `Club ${club.name}, editado com sucesso!`;
  }
}
