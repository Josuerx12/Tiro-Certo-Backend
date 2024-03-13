import { body } from "express-validator";

const EditClubValidations = [
  body("name")
    .optional()
    .isString()
    .withMessage("Nome do club é obrigatorio!")
    .isLength({ min: 3 })
    .withMessage("Nome deve conter no mínimo "),
  body("long")
    .optional()
    .isLatLong()
    .withMessage("Longitude deve ser valida para cadastrar!"),
  body("lat")
    .optional()
    .isLatLong()
    .withMessage("Latitude deve ser valida para cadastrar!"),
  body("cr")
    .optional()
    .isString()
    .withMessage("Certificado de registro deve ser valido!"),
  body("cnpj")
    .optional()
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

export { EditClubValidations };
