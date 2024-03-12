import { param } from "express-validator";

const DeleteClubValidation = [
  param("id").isUUID().withMessage("ID invalido, corrija e tente novamente!"),
];

export { DeleteClubValidation };
