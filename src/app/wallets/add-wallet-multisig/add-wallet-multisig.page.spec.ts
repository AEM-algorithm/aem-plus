import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddWalletMultisigPage } from './add-wallet-multisig.page';

describe('AddWalletMultisigPage', () => {
  let component: AddWalletMultisigPage;
  let fixture: ComponentFixture<AddWalletMultisigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWalletMultisigPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWalletMultisigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
