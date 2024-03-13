import { Request, Response } from "express";
import { IUser } from "../UserInterface";
import { auth, getFile } from "../../../config/GDrive";

export class GetUserController {
  async handle(req: Request, res: Response) {
    const payload = req.user as IUser;

    await auth().then(
      async (jwt) =>
        await getFile(jwt, payload.photo).then((data) => console.log(data))
    );

    return res.send({ payload });
  }
}
