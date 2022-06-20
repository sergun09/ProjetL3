import { Inventaire } from "./Inventaire";
import { User } from "./User";

export class Dysfonctionnement {
  id: number
  description: string ;
  date: Date;
  materiel: Inventaire;
  adherent: User;
}
