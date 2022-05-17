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
  montant_caution: number;
  commentaire: string;
  en_maintenance: boolean;
}
