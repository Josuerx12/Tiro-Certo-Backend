import { body } from "express-validator";

const CreateClubValidations = [
  body("name")
    .isString()
    .withMessage("Nome do club é obrigatorio!")
    .isLength({ min: 3 })
    .withMessage("Nome deve conter no mínimo "),
  body("long")
    .isLatLong()
    .withMessage("Longitude deve ser valida para cadastrar!"),
  body("lat")
    .isLatLong()
    .withMessage("Latitude deve ser valida para cadastrar!"),
  body("cr").isString().withMessage("Certificado de registro deve ser valido!"),
  body("cnpj")
    .isString()
    .withMessage("CNPJ é obrigatorio!")
    .custom((value) => {
      const cnpjRegex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;

      if (!cnpjRegex.test(value)) {
        throw new Error("CNPJ Invalido!");
      }

      return true;
    }),
  body("users")
    .optional()
    .isArray()
    .withMessage("Users deve ser um array de strings!"),
];

export { CreateClubValidations };
