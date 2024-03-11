import { body, param } from "express-validator";
import WeaponCategory from "../../../entities/WeaponCategory";

const EditWeaponsCategoryValidation = [
  param("id")
    .isUUID()
    .withMessage("ID informado não é valido!")
    .custom(async (value) => {
      const existingCategory = await WeaponCategory.findById(value);

      if (!existingCategory) {
        throw new Error("Nenhuma categoria encotrada para o ID: " + value);
      }
      return true;
    }),
  body("name")
    .optional()
    .isString()
    .withMessage("Nome da categoria é obrigatorio")
    .custom(async (value) => {
      const existingCategory = await WeaponCategory.findOne({ name: value });

      if (existingCategory) {
        throw new Error(
          "Nomé já cadastrado no banco de dados, digite outro nome para categoria e continue!"
        );
      }

      return true;
    }),
];
