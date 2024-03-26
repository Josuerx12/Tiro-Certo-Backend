import Weapons from "../../../entities/Weapons";

export class GetAcervoByOwnerIdUseCase {
  async execute(userid: string) {
    const acervo = await Weapons.find({ ownerId: userid });

    return acervo;
  }
}
