import { TypeMateriel } from "./TypeMateriel";

export class Inventaire {
  id: number
  typeMateriel: TypeMateriel;
  intitule: string;
  description: string;
  kit: string;
  conditionnement: string;
  etat: string;
  emprunt: string;
  montantCaution: number;
  commentaire: string;
  enMaintenance: boolean;
}
