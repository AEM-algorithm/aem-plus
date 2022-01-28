import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddressWalletPage } from './address-wallet.page';

describe('AddressWalletPage', () => {
  let component: AddressWalletPage;
  let fixture: ComponentFixture<AddressWalletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddressWalletPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
