import { body } from "express-validator";
import { TWeapon } from "./CreateActivityRegisterDTO";

const CreateActivityRegisterValidations = [
  body("clubId").isUUID().withMessage("ID fornecida não é valida!"),
  body("userGeoLocation")
    .isLatLong()
    .withMessage("Localização deve ser valida!"),
  body("weapons")
    .isArray()
    .withMessage("Informar as armas utilizadas é obrigatorio!")
    .custom((value: TWeapon[]) => {
      for (let i = 0; i < value.length; i++) {
        if (
          !value[i].categoria ||
          !value[i].disparos ||
          !value[i].modelo ||
          !value[i].name ||
          !value[i].registro ||
          !value[i].validade
        ) {
          throw new Error("Verifique os dados da sua arma e tenten novamente!");
        }
        return true;
      }
    }),
  body("activity").isString().withMessage("Atividade deve ser informada!"),
];

export { CreateActivityRegisterValidations };
