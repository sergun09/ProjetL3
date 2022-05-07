import { Component, OnInit } from '@angular/core';
import { Materiel } from '../materiel.model';
import { MaterielsService } from '../materiels.service';

@Component({
  selector: 'app-resultats-recherche',
  templateUrl: './resultats-recherche.page.html',
  styleUrls: ['./resultats-recherche.page.scss'],
})
export class ResultatsRecherchePage implements OnInit {

  materiels: Materiel[];

  constructor( private matService: MaterielsService) { }

  ngOnInit() {
    this.materiels=this.matService._materiels;
  }

}
