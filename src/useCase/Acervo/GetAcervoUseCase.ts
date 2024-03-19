import Weapons from "../../entities/Weapons";
import { IUser } from "../User/UserInterface";
export class GetAcervoUseCase {
  async execute(user: IUser) {
    const acervo = await Weapons.find({ ownerId: user._id });

    return acervo;
  }
}
