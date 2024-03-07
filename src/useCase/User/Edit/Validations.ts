import { body } from "express-validator";
import User from "../../../entities/User";

const editUserValidations = [
  body("name")
    .optional()
    .isString()
    .withMessage("Nome deve ser preenchido!")
    .isLength({ min: 3, max: 60 })
    .withMessage("Nome deve conter entre 3 a 60 caracteres!"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("E-mail valido é obrigatorio!")
    .custom(async (value: string) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("E-mail já cadastrado no sistema!!");
      }
      return true;
    }),
  body("cpf")
    .optional()
    .isString()
    .withMessage("CPF é obrigatório no cadastro!")
    .custom((value: string) => {
      const cpfValidationRegex =
        /^(?:(?:(?:\d{3}\.){2}\d{3}-\d{2})|(?:\d{11}))$/;
      if (!value.match(cpfValidationRegex)) {
        throw new Error("Insira um cpf valido para continuar!");
      }
      return true;
    }),
  body("password")
    .optional()
    .isStrongPassword()
    .withMessage(
      "Senha deve conter 8 caracteres, sendo pelo menos 1 especial, 1 em caixa alta e 1 numero."
    )
    .custom((value: string, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error("As senhas não se conferem!");
      }
      return true;
    }),
  body("cr").optional().isString().withMessage("CR deve ser válido!"),
  body("admin")
    .optional()
    .isBoolean()
    .withMessage("Admin deve ser um valor booleano!"),
  body("supervisor")
    .optional()
    .isBoolean()
    .withMessage("Supervisor deve ser um valor booleano!"),
  body("founder")
    .optional()
    .isBoolean()
    .withMessage("Founder deve ser um valor booleano!"),
];

export { editUserValidations };
