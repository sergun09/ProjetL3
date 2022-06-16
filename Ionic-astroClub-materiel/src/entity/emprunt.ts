import { Inventaire } from "./Inventaire";
import { User } from "./User";

export class Emprunt {
  id: number
  datedebut: Date ;
  datefin: Date;
  motif: string;
  adherent: User;
  materiel: Inventaire;
}
