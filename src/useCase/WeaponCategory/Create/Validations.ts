import { body } from "express-validator";
import WeaponCategory from "../../../entities/WeaponCategory";

const CreateWeaponCategoryValidation = [
  body("name")
    .isString()
    .withMessage("Nome da categoría é obrigatorio!")
    .custom(async (value) => {
      const category = await WeaponCategory.findOne({ name: value });

      if (category) {
        throw new Error("Nome já cadastrado no banco de dados!");
      }

      return true;
    }),
];

export { CreateWeaponCategoryValidation };
