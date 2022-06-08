import { Inventaire } from "./Inventaire";

export class Emprunt {
  id: number
  datedebut: Date ;
  datefin: Date;
  motif: string;
  materiel: Inventaire;
}
