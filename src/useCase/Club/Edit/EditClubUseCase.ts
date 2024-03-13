import { multerFile } from "../../../config/Upload";
import Club from "../../../entities/Club";
import { IEditClubDTO } from "./EditClubDTO";
import { deleteToDrive, uploadDrive, auth } from "../../../config/GDrive";

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
      if (club.logo) {
        await auth().then(
          async (token) => await deleteToDrive(token, club.logo)
        );
      }

      await auth().then(
        async (token) =>
          await uploadDrive(token, logo).then(
            async (res) =>
              await club.updateOne({ ...credentials, logo: res.id })
          )
      );

      return `Club ${club.name}, editado com sucesso!`;
    }

    await club.updateOne(credentials);
    return `Club ${club.name}, editado com sucesso!`;
  }
}
