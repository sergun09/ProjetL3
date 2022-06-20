import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Dysfonctionnement } from 'src/entity/dysfonctionnement';
import { DysfonctionnementService } from 'src/services/dysfonctionnement.service';

@Component({
  selector: 'app-dysfonctionnement-det',
  templateUrl: './dysfonctionnement-det.page.html',
  styleUrls: ['./dysfonctionnement-det.page.scss'],
})
export class DysfonctionnementDetPage implements OnInit {

  dysfonctionnement : Dysfonctionnement= new Dysfonctionnement();
  date:string;

  constructor(
    private loadingCrtl:LoadingController,
    private route: ActivatedRoute,
    private navCtrl:NavController,
    private dysfonctionnementService: DysfonctionnementService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadingCrtl.create({keyboardClose: true, message : 'Veuillez patienter...'}).then(loadingEl =>{
      loadingEl.present();
      this.route.paramMap.subscribe(paramMap =>{
      if (!paramMap.has('dysfonctionnementId')) {
        this.navCtrl.navigateBack('/home/maintenance/dysfonctionnement');
        return;
      }
      this.dysfonctionnementService.getOneDysfonctionnement(Number(paramMap.get('dysfonctionnementId'))).subscribe(response => {
        this.dysfonctionnement = response;
        this.date=new Date(this.dysfonctionnement.date).toLocaleString();
        loadingEl.dismiss();
      })
      })
    })
  }

}
