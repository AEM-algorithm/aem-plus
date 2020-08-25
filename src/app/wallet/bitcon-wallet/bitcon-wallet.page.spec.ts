import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BitconWalletPage } from './bitcon-wallet.page';

describe('BitconWalletPage', () => {
  let component: BitconWalletPage;
  let fixture: ComponentFixture<BitconWalletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitconWalletPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BitconWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
