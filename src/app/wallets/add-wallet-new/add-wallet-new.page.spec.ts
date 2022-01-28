import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddWalletNewPage } from './add-wallet-new.page';

describe('AddWalletNewPage', () => {
  let component: AddWalletNewPage;
  let fixture: ComponentFixture<AddWalletNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddWalletNewPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AddWalletNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
