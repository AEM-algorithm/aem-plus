import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WalletManagerPage } from './wallet-manager.page';

describe('WalletManagerPage', () => {
  let component: WalletManagerPage;
  let fixture: ComponentFixture<WalletManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletManagerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WalletManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
