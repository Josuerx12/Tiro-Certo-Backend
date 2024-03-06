import User from "../../../entities/User";
import { IUser } from "../UserInterface";
import { multerFile } from "../../../middlewares/Upload";

export class EditUserUseCase {
  async execute(id: string, credentials: IUser, file?: multerFile) {
    if (file) {
      console.log(file);
    }

    const user = await User.findByIdAndUpdate(id, credentials);

    return `Usuário: ${user.name}, editado com sucesso!`;
  }
}
