export type TWeapon = {
  name: string;
  tipo: string;
  categoria: string;
  registro: string;
  validade: string;
};

export interface ICreateActivityRegisterDTO {
  long: string;
  lat: string;
  weapons: TWeapon[];
  activity: string;
  clubId: string;
}
