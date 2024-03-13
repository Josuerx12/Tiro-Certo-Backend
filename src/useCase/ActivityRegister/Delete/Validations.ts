import { param } from "express-validator";

const DeleteActivityRegisterValidation = [
  param("id").isUUID().withMessage("ID informada não é valida!"),
];

export { DeleteActivityRegisterValidation };
