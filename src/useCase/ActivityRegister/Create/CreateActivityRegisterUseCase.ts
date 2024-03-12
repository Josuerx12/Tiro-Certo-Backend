import { IUser } from "../../User/UserInterface";
import { ICreateActivityRegisterDTO } from "./CreateActivityRegisterDTO";
export class CreateActivityRegisterUseCase {
  async execute(credentials: ICreateActivityRegisterDTO, user: IUser) {}
}
