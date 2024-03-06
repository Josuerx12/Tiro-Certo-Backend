import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import User from "../../../entities/User";
import { ILoginDTO } from "./LoginDTO";

export class LoginUseCase {
  async execute(credentials: ILoginDTO) {
    const user = await User.findOne({ email: credentials.email });

    const verifiedUser = await compare(credentials.password, user.password);

    if (!verifiedUser) {
      throw new Error("Senha incorreta, corrija e tente novamente!");
    }

    const token = sign(user._id, process.env.SECRET, {
      expiresIn: "7d",
    });
    return token;
  }
}
