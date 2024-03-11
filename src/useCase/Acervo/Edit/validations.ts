import { body } from "express-validator";
import Acervo from "../../../entities/Acervo";
import { Weapons } from "./EditAcervoUseCase";

const AcervoEditValidations = [
  body("weapons")
    .isArray()
    .withMessage("Armas deve ser enviados em formato de array!")
    .custom(async (value: Weapons[], { req }) => {
      const acervo = await Acervo.findOne({ userID: req.user._id });

      if (!acervo) {
        throw new Error("Nenhuma acervo encontrado para o usuário atual!");
      }
      const weaponIds = value.map((weapon) => weapon.registro);
      const existingWeaponIds = acervo.weapons.map((weapon) => weapon.registro);

      const duplicateWeaponIds = weaponIds.filter((weaponId) =>
        existingWeaponIds.includes(weaponId)
      );

      if (duplicateWeaponIds.length > 0) {
        throw new Error(
          "Armas já cadastradas: " + duplicateWeaponIds.join(", ")
        );
      }

      return true;
    }),
];
