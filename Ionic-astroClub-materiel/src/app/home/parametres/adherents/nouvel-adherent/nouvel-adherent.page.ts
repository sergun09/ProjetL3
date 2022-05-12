import { Component, OnInit } from '@angular/core';
import { UserPost } from 'src/entity/UserPost';
import { AdherentsService } from 'src/services/adherents.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-nouvel-adherent',
  templateUrl: './nouvel-adherent.page.html',
  styleUrls: ['./nouvel-adherent.page.scss'],
})
export class NouvelAdherentPage implements OnInit {

  user: UserPost =
    {
      uuid: "",
      password: "",
      nom: ""
    }
  constructor(public adherentService: AdherentsService) { }

  ngOnInit() {
  }

  create(nom: string): void {
    const uuid = uuidv4();
    if (nom != null) {
      this.user.nom = nom;
      this.user.uuid = uuid.toString();
      this.user.password = uuid.toString();
      console.log(this.user);
      this.adherentService.createUser(this.user)
    }
  }
}
