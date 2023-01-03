import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectWalletListingModalComponent } from './select-wallet-listing-modal.component';

describe('SelectWalletListingModalComponent', () => {
  let component: SelectWalletListingModalComponent;
  let fixture: ComponentFixture<SelectWalletListingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectWalletListingModalComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectWalletListingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
