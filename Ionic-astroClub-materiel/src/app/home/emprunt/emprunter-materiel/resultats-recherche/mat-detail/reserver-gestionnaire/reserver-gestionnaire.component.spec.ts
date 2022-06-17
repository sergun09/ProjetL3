import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReserverGestionnaireComponent } from './reserver-gestionnaire.component';

describe('ReserverGestionnaireComponent', () => {
  let component: ReserverGestionnaireComponent;
  let fixture: ComponentFixture<ReserverGestionnaireComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserverGestionnaireComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReserverGestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
