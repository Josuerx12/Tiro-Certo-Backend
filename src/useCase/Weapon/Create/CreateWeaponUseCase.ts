import Weapons from "../../../entities/Weapons";
import { IUser } from "../../User/UserInterface";
import { CreateWeaponDTO } from "./CreateWeaponDTO";
import { v4 } from "uuid";

export class CreateWeaponUseCase {
  async execute(credentials: CreateWeaponDTO, user: IUser) {
    const weapon = await Weapons.create({
      ...credentials,
      ownerId: user._id,
      _id: v4(),
    });

    return `Armamento número: ${weapon.registro}, cadastrado com sucesso!`;
  }
}
