export type TWeapon = {
  name: string;
  modelo: string;
  categoria: string;
  registro: string;
  validade: string;
  disparos: number;
};

export interface ICreateActivityRegisterDTO {
  userId: string;
  userGeoLocation: string;
  weapons: TWeapon[];
  activity: string;
  clubId: string;
}
