import { v4 as uuidv4 } from "uuid";
import User from "../../../entities/User";
import { IRegisterDTO } from "./RegisterDTO";
import { genSalt, hash } from "bcryptjs";
import { dbx } from "../../../config/Dbox";

export default class RegisterUseCase {
  async execute(credentials: IRegisterDTO, photo: Express.Multer.File) {
    const salt = await genSalt(10);
    const passHash = await hash(credentials.password, salt);

    const user = await User.create({
      ...credentials,
      _id: uuidv4(),
      password: passHash,
      cpf: Number(credentials.cpf.replace(".", "")),
    });

    if (photo) {
      await dbx
        .filesUpload({
          path: "/tirocerto/" + uuidv4() + "." + photo.mimetype.split("/")[1],
          contents: photo.buffer,
        })
        .then(
          async (res) =>
            await dbx.sharingCreateSharedLinkWithSettings({
              path: res.result.path_lower,
            })
        )
        .then((res) => {
          (user.photoPath = res.result.path_lower),
            (user.photoURL = res.result.url.replace(
              "www.dropbox.com",
              "dl.dropboxusercontent.com"
            ));
        });

      await user.save();
    }

    return `Usuário ${user.name}, criado com sucesso!`;
  }
}
