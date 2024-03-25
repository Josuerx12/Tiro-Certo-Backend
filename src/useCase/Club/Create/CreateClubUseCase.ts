import { multerFile } from "../../../config/Upload";
import { admin } from "../../../config/firebase";
import Club from "../../../entities/Club";
import { ICreateClubDTO } from "./CreateClubDTO";
import { v4 } from "uuid";

export class CreateClubUseCase {
  async execute(credentials: ICreateClubDTO, logo: multerFile) {
    const club = await Club.create({ ...credentials, _id: v4() });

    if (logo) {
      logo.originalname = v4() + "." + logo.mimetype.split("/")[1];

      const bucket = admin.storage().bucket();

      const file = bucket.file(logo.originalname);

      await file.save(logo.buffer);

      club.logoURL = `https://storage.googleapis.com/${bucket.name}/${logo.originalname}`;

      club.logoPath = logo.originalname;

      await club.save();
    }

    return `Clube: ${club.name}, criado com sucesso!`;
  }
}
