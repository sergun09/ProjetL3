import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MaterielsService } from './materiels.service';

@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.page.html',
  styleUrls: ['./inventaire.page.scss'],
})
export class InventairePage implements OnInit {

  constructor( private matService: MaterielsService) { }

  ngOnInit() {
  }

  onSubmit(form : NgForm){
    console.log(form);

  }
}
