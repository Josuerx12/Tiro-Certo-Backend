import Weapons from "../../../entities/Weapons";
import { IUser } from "../../User/UserInterface";
import { CreateWeaponDTO } from "./CreateWeaponDTO";
import { v4 } from "uuid";

export class CreateWeaponUseCase {
  async execute(credentials: CreateWeaponDTO) {
    const weapon = await Weapons.create({
      ...credentials,
      _id: v4(),
    });

    return `Armamento número: ${weapon.register}, cadastrado com sucesso!`;
  }
}
