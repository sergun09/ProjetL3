import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InventairesService } from 'src/services/inventaires.service';

@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.page.html',
  styleUrls: ['./inventaire.page.scss'],
})
export class InventairePage implements OnInit {

  constructor( private inventaireService: InventairesService) { }

  ngOnInit() {
  }

  onSubmit(form : NgForm){
    console.log(form);

  }
}
