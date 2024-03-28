import { body } from "express-validator";
import WeaponCategory from "../../../entities/WeaponCategory";
import Weapons from "../../../entities/Weapons";
import User from "../../../entities/User";

const WeaponValidation = [
  body("brand")
    .isString()
    .withMessage("Marca da arma deve ser informada!")
    .isLength({ min: 3 })
    .withMessage("Nome da arma deve conter no mínimo 3 caracteres!"),
  body("ownerId")
    .isUUID()
    .withMessage("ID de usuário informado não é valido!")
    .custom(async (value) => {
      const user = await User.findById(value);

      if (!user) {
        throw new Error("Usuário não encontrado no banco de dados.");
      }

      return true;
    }),
  body("categoryId")
    .isUUID()
    .withMessage("Categoria selecionada não é valida!")
    .custom(async (value) => {
      const category = await WeaponCategory.findById(value);

      if (!category) {
        throw new Error("Categoria selecionada não existe no banco de dados!");
      }

      return true;
    }),
  body("model")
    .isString()
    .withMessage("Modelo da arma deve ser preenchido!")
    .isLength({ min: 3 })
    .withMessage("Modelo deve conter no mínimo 3 caracteres!"),
  body("caliber")
    .isString()
    .withMessage("Calibre da arma deve ser informado!")
    .isLength({ min: 2 })
    .withMessage("Calibre deve conter no mínimo 2 caracteres!"),
  body("register")
    .isString()
    .withMessage("O numero de registro da arma deve ser informado!")
    .custom(async (value) => {
      const weapon = await Weapons.findOne({ registro: value });

      if (weapon) {
        throw new Error("Numero de registro desta arma já foi cadastrado!");
      }

      return true;
    }),
  body("GTValidation").isISO8601().withMessage("Data deve ser valida!"),
];

export { WeaponValidation };
