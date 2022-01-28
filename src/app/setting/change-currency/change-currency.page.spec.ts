import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeCurrencyPage } from './change-currency.page';

describe('ChangeCurrencyPage', () => {
  let component: ChangeCurrencyPage;
  let fixture: ComponentFixture<ChangeCurrencyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeCurrencyPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeCurrencyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
