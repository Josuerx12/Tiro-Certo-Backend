export interface ICreateClubDTO {
  name: string;
  long: string;
  lat: string;
  cr: string;
  cnpj: string;
  users?: [string] | [];
}
