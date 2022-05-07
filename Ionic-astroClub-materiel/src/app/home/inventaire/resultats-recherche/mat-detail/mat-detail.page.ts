import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Materiel } from '../../materiel.model';
import { MaterielsService } from '../../materiels.service';

@Component({
  selector: 'app-mat-detail',
  templateUrl: './mat-detail.page.html',
  styleUrls: ['./mat-detail.page.scss'],
})
export class MatDetailPage implements OnInit {

  materiel: Materiel;

  constructor(private matService: MaterielsService, private route: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap =>{
      if (!paramMap.has('materielId')) {
        this.navCtrl.navigateBack('/home/inventaire/resultats-recherche');
        return;
      }
      this.materiel = this.matService.getMateriel(Number(paramMap.get('materielId')));
    })
  }

}
