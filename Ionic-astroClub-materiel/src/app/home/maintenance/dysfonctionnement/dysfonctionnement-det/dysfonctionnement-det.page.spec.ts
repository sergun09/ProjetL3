import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DysfonctionnementDetPage } from './dysfonctionnement-det.page';

describe('DysfonctionnementDetPage', () => {
  let component: DysfonctionnementDetPage;
  let fixture: ComponentFixture<DysfonctionnementDetPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DysfonctionnementDetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DysfonctionnementDetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
