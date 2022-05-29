import { Inventaire } from "./Inventaire";

export class Reparation {
  id: number
  nom: string;
  description: string;
  materiel: Inventaire;
}
