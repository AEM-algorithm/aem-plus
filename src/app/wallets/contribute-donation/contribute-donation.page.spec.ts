import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContributeDonationPage } from './contribute-donation.page';

describe('ContributeDonationPage', () => {
  let component: ContributeDonationPage;
  let fixture: ComponentFixture<ContributeDonationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributeDonationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContributeDonationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
