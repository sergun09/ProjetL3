import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmpruntGestionnaireComponent } from './emprunt-gestionnaire.component';

describe('EmpruntGestionnaireComponent', () => {
  let component: EmpruntGestionnaireComponent;
  let fixture: ComponentFixture<EmpruntGestionnaireComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpruntGestionnaireComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpruntGestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
