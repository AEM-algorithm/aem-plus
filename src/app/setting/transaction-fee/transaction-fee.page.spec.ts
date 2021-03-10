import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransactionFeePage } from './transaction-fee.page';

describe('TransactionFeePage', () => {
  let component: TransactionFeePage;
  let fixture: ComponentFixture<TransactionFeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionFeePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionFeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
