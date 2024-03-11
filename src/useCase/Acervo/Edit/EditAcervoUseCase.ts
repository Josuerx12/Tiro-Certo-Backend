import Acervo from "../../../entities/Acervo";
import { IUser } from "../../User/UserInterface";

export type Weapons = {
  _id: String;
  name: String;
  categoryId: String;
  modelo: String;
  registro: String;
  validade: String;
};

export class EditAcervoUseCase {
  async execute(user: IUser, weapons: Weapons[]) {
    const acervo = await Acervo.findOne({ userID: user._id });

    acervo.weapons.push(...weapons);

    await acervo.save();

    return acervo;
  }
}
