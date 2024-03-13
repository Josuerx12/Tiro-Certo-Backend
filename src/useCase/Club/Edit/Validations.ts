import { body } from "express-validator";
import Club from "../../../entities/Club";

const EditClubValidations = [
  body("name")
    .optional()
    .isString()
    .withMessage("Nome do club é obrigatorio!")
    .isLength({ min: 3 })
    .withMessage("Nome deve conter no mínimo 3 caracteres!"),
  body("geoLocation")
    .optional()
    .isLatLong()
    .withMessage("Localização deve ser valida para continuar!"),
  body("cr")
    .optional()
    .isString()
    .withMessage("Certificado de registro deve ser valido!")
    .custom(async (value) => {
      const club = await Club.findOne({ cr: value });
      if (club) {
        throw new Error("CR informado já em uso!");
      }
      return true;
    }),
  body("cnpj")
    .optional()
    .isString()
    .withMessage("CNPJ é obrigatorio!")
    .custom(async (value) => {
      const cnpjRegex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;

      if (!cnpjRegex.test(value)) {
        throw new Error("CNPJ Invalido!");
      }

      const club = await Club.findOne({ cnpj: value });

      if (club) {
        throw new Error("CNPJ: " + value + ", já em usuo!");
      }

      return true;
    }),
  body("users")
    .optional()
    .isArray()
    .withMessage("Users deve ser um array de strings!"),
];

export { EditClubValidations };
