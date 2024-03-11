import Acervo from "../../../entities/Acervo";
import { IUser } from "../../User/UserInterface";
import { Weapons } from "../Edit/EditAcervoUseCase";

export class DeleteWeaponOfAcervoController {
  async execute(user: IUser, weaponId: string) {
    const userAcervo = await Acervo.findOne({ userID: user._id });

    const newWeaponsArray = (userAcervo.weapons as Weapons[]).filter(
      (w) => w._id !== weaponId
    );
    await Acervo.updateOne(
      { _id: userAcervo._id },
      { weapons: newWeaponsArray }
    );

    return `Arma id: ${weaponId}, removida do acervo com sucesso!`;
  }
}
