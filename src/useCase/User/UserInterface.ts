export interface IUser {
  _id: string;
  name: string;
  email: string;
  cpf: Number;
  cr: number | null;
  photo: string | null;
  imageSignature: string | null;
  fingerPrintSignature: string | null;
  password: string;
  admin: boolean;
  supervisor: boolean;
  founder: boolean;
}
