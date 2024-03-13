export interface ICreateClubDTO {
  name: string;
  geoLocation: string;
  cr: string;
  cnpj: string;
  users?: [string] | [];
}
