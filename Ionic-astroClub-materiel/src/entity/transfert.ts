import { Inventaire } from "./Inventaire";
import { User } from "./User";

export class Transfert {
  id: number
  emetteur: User ;
  recepteur: User;
  etat: boolean;
  materiel: Inventaire;
}
