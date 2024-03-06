import { body } from "express-validator";
import User from "../../../entities/User";

const loginValidations = [
  body("email")
    .isEmail()
    .withMessage("E-mail valido deve ser informado para realizar o login!")
    .custom(async (value: string) => {
      const user = await User.findOne({ email: value });
      if (!user) {
        throw new Error(`Nenhum usuário cadastrado com o e-mail: ${value}!`);
      }
      return true;
    }),
  body("password")
    .isStrongPassword()
    .withMessage(
      "Senha deve conter 8 caracteres, sendo pelo menos 1 especial, 1 em caixa alta e 1 numero."
    ),
];

export { loginValidations };
