import { body } from "express-validator";
import Club from "../../../entities/Club";

const CreateClubValidations = [
  body("name")
    .isString()
    .withMessage("Nome do club é obrigatorio!")
    .isLength({ min: 3 })
    .withMessage("Nome deve conter no mínimo "),
  body("geoLocation")
    .isLatLong()
    .withMessage("Localização deve ser valida para continuar!"),
  body("cr")
    .isString()
    .withMessage("Certificado de registro deve ser valido!")
    .custom(async (value) => {
      const club = await Club.findOne({ cr: value });

      if (club) {
        throw new Error("CR já cadastrado em outro clube!");
      }

      return true;
    }),
  body("cnpj")
    .isString()
    .withMessage("CNPJ é obrigatorio!")
    .custom(async (value) => {
      const cnpjRegex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;

      if (!cnpjRegex.test(value)) {
        throw new Error("CNPJ Invalido!");
      }

      const club = await Club.findOne({ cnpj: value });

      if (club) {
        throw new Error("CNPJ já cadastrado em um club.");
      }

      return true;
    }),
  body("users")
    .optional()
    .isArray()
    .withMessage("Users deve ser um array de strings!"),
];

export { CreateClubValidations };
