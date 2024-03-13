import ActivityRegister from "../../../entities/ActivityRegister";
import Club from "../../../entities/Club";
import { IUser } from "../../User/UserInterface";
import {
  ICreateActivityRegisterDTO,
  TWeapon,
} from "./CreateActivityRegisterDTO";
export class CreateActivityRegisterUseCase {
  degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const earthRadiusKm = 6371;

    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) *
        Math.cos(this.degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    return distance;
  }

  isWithinRadius(
    userLat: number,
    userLon: number,
    locationLat: number,
    locationLon: number,
    radiusKm: number
  ): boolean {
    const distance = this.calculateDistance(
      userLat,
      userLon,
      locationLat,
      locationLon
    );
    return distance <= radiusKm;
  }

  async execute(credentials: ICreateActivityRegisterDTO, user: IUser) {
    const { long, lat, clubId, activity, weapons } = credentials;
    const club = await Club.findById(clubId);

    if (!club) {
      throw new Error("Clube id: " + clubId + ", não encontrado!");
    }

    if (!this.isWithinRadius(lat, long, club.lat, club.long, 1)) {
      throw new Error("Localização não compativel com a do clube!");
    }

    let arrWeapons: TWeapon[] = [];

    for (let i = 0; i < weapons.length; i++) {
      if (arrWeapons.find((a) => a.registro === weapons[i].registro)) {
        throw new Error(
          `Armamento numero: ${weapons[i].registro}, já listado verifique e tente novamente!`
        );
      }
    }

    await ActivityRegister.create({
      ownerID: user._id,
      activity: activity.toLowerCase(),
      club,
      name: user.name,
      cpf: user.cpf,
      cr: user.cr,
      weapons,
    });
  }
}
