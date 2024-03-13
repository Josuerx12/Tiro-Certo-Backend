import { param } from "express-validator";

const GetActivityRegisterValidation = [
  param("id").isUUID().withMessage("ID informada não é valida!"),
];

export { GetActivityRegisterValidation };
