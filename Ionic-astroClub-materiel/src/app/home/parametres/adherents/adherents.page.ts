import { Component, OnInit } from '@angular/core';
import { User } from 'src/entity/User';
import { AdherentsService } from 'src/services/adherents.service';

@Component({
  selector: 'app-adherents',
  templateUrl: './adherents.page.html',
  styleUrls: ['./adherents.page.scss'],
})
export class AdherentsPage implements OnInit {

  adherents: Array<User> = new Array();
  constructor(public adherentService: AdherentsService) { }

  ngOnInit() {
    this.adherentService.getAllUsers().subscribe((response) => this.adherents = response)

  }

  deleteUser(idAdh: number) {
    this.adherentService.deleteUserFromId(idAdh)
  }

}
