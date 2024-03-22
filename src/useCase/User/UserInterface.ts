export interface IUser {
  _id: string;
  name: string;
  email: string;
  cpf: Number;
  cr: number | null;
  photoURL: string;
  photoPath: string;
  admin: boolean;
  founder: boolean;
}
