import { body } from "express-validator";

const CreateActivityRegisterValidations = [
  body("clubId").isUUID().withMessage("ID fornecida não é valida!"),
  body("long").isLatLong().withMessage("Longitude informada não é valida!"),
  body("lat").isLatLong().withMessage("Latitude informada não é valida!"),
  body("weapons")
    .isArray()
    .withMessage("Informar as armas utilizadas é obrigatorio!"),
  body("activity").isString().withMessage("Atividade deve ser informada!"),
];

export { CreateActivityRegisterValidations };
