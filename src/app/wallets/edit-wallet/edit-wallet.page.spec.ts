import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditWalletPage } from './edit-wallet.page';

describe('EditWalletPage', () => {
  let component: EditWalletPage;
  let fixture: ComponentFixture<EditWalletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWalletPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
