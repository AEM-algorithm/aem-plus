import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonationModalComponent } from './donation-modal.component';

describe('DonationModalComponent', () => {
  let component: DonationModalComponent;
  let fixture: ComponentFixture<DonationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DonationModalComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DonationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
