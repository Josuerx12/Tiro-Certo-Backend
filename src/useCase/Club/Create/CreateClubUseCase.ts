import { multerFile } from "../../../config/Upload";
import Club from "../../../entities/Club";
import { ICreateClubDTO } from "./CreateClubDTO";
import { uploadDrive, auth } from "../../../config/GDrive";

export class CreateClubUseCase {
  async execute(credentials: ICreateClubDTO, logo: multerFile) {
    const club = await Club.create(credentials);

    if (logo) {
      await auth().then(
        async (token) =>
          await uploadDrive(token, logo).then((res) => (club.logo = res.id))
      );

      await club.save();
    }

    return `Clube: ${club.name}, criado com sucesso!`;
  }
}
