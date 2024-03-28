import Weapons from "../../../entities/Weapons";

export class GetAllAcervoUseCase {
  async execute() {
    const acervo = await Weapons.find();

    return acervo;
  }
}
