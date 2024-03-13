import { body } from "express-validator";
import WeaponCategory from "../../../entities/WeaponCategory";
import Weapons from "../../../entities/Weapons";

const WeaponValidation = [
  body("name")
    .isString()
    .withMessage("Nome da arma deve ser informado!")
    .isLength({ min: 3 })
    .withMessage("Nome da arma deve conter no mínimo 3 caracteres!"),
  body("categoryID")
    .isUUID()
    .withMessage("Categoria selecionada não é valida!")
    .custom(async (value) => {
      const category = await WeaponCategory.findById(value);

      if (!category) {
        throw new Error("Categoria selecionada não existe no banco de dados!");
      }

      return true;
    }),
  body("modelo")
    .isString()
    .withMessage("Modelo da arma deve ser preenchido!")
    .isLength({ min: 3 })
    .withMessage("Modelo deve conter no mínimo 3 caracteres!"),
  body("registro")
    .isString()
    .withMessage("O numero de registro da arma deve ser informado!")
    .custom(async (value) => {
      const weapon = await Weapons.findOne({ registro: value });

      if (weapon) {
        throw new Error("Numero de registro desta arma já foi cadastrado!");
      }

      return true;
    }),
  body("validade").isDate().withMessage("Data deve ser valida!"),
];

export { WeaponValidation };
