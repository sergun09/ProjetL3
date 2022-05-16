export class Inventaire {
  id: number
  type_materiel_id: number;
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
