export class InventaireExport
{
    typeMateriel : string;
    intitule: string;
    description: string;
    kit: string;
    conditionnement: string;
    etat: string;
    emprunt: string;
    montantCaution: number;
    commentaire: string;
    enMaintenance: boolean;

    constructor(
        typeMateriel : string,
        intitule: string,
        description: string,
        kit: string,
        conditionnement: string,
        etat: string,
        emprunt: string,
        montantCaution: number,
        commentaire: string,
        enMaintenance: boolean
    )
    {
        this.typeMateriel = typeMateriel;
        this.intitule = intitule;
        this.description = description
        this.kit = kit
        this.conditionnement = conditionnement;
        this.etat = etat
        this.emprunt = emprunt
        this.montantCaution = montantCaution
        this.commentaire = commentaire
        this.enMaintenance = enMaintenance;
    }
}