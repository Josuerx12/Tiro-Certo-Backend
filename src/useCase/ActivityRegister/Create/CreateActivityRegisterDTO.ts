export type TWeapon = {
  name: string;
  modelo: string;
  categoria: string;
  registro: string;
  validade: string;
  disparos: number;
};

export interface ICreateActivityRegisterDTO {
  userGeoLocation: string;
  weapons: TWeapon[];
  activity: string;
  clubId: string;
}
