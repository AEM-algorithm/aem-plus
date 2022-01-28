import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddWalletPrivatePage } from './add-wallet-private.page';

describe('AddWalletPrivatePage', () => {
  let component: AddWalletPrivatePage;
  let fixture: ComponentFixture<AddWalletPrivatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddWalletPrivatePage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AddWalletPrivatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
