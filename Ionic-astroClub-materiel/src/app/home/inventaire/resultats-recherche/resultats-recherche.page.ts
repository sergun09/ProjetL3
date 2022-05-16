import { Component, OnInit } from '@angular/core';
import { Inventaire } from 'src/entity/Inventaire';
import {InventairesService} from "../../../../services/inventaires.service";

@Component({
  selector: 'app-resultat-recherche',
  templateUrl: './resultats-recherche.page.html',
  styleUrls: ['./resultats-recherche.page.scss'],
})
export class InventairesPage implements OnInit {

  public inventaires: Array<Inventaire> = new Array();
  constructor(public inventairesService: InventairesService) { }

  ngOnInit() {
    this.inventairesService.getAllInventaires().subscribe((response) => {this.inventaires = response});

  }

  deleteInventaire(idInv: number) {
    this.inventairesService.deleteInventaireFromId(idInv)
  }

}
