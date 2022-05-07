import { Injectable } from '@angular/core';
import { Materiel } from './materiel.model';

@Injectable({
  providedIn: 'root'
})
export class MaterielsService {

  private materiels: Materiel[]= [
    new Materiel(1,'type 1','intitulé 1','desc 1','kit 1','conditionnement 1','etat 1','emprunt 1', 11,'commantaire 1','en maintenance 1'),
    new Materiel(2,'type 2','intitulé 2','desc 2','kit 2','conditionnement 2','etat 2','emprunt 2', 22,'commantaire 2','en maintenance 2'),
    new Materiel(3,'type 3','intitulé 3','desc 3','kit 3','conditionnement 3','etat 3','emprunt 3', 33,'commantaire 3','en maintenance 3'),
  ];

  constructor() { }

  get _materiels() {
    return [...this.materiels];
  }

  getMateriel(id: number) {
    return {...this.materiels.find(tab => tab.id === id)};
  }
}
