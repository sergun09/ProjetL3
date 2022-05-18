import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReservationService } from 'src/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  constructor( private reservationService: ReservationService) { }

  ngOnInit() {
  }

  onSubmit(form : NgForm){
    console.log(form);

  }
}
