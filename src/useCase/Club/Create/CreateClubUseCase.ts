import { multerFile } from "../../../config/Upload";
import Club from "../../../entities/Club";
import { ICreateClubDTO } from "./CreateClubDTO";
import { v4 } from "uuid";
import { dbx } from "../../../config/Dbox";

export class CreateClubUseCase {
  async execute(credentials: ICreateClubDTO, logo: multerFile) {
    const club = await Club.create({ ...credentials, _id: v4() });

    if (logo) {
      await dbx
        .filesUpload({
          path: `/tirofacil/${v4()}.${logo.mimetype.split("/")[1]}`,
          contents: logo.buffer,
        })
        .then((res) => console.log(res));

      await club.save();
    }

    return `Clube: ${club.name}, criado com sucesso!`;
  }
}
