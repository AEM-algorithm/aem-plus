import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmTransactionModalComponent } from './confirm-transaction-modal.component';

describe('ConfirmTransactionModalComponent', () => {
  let component: ConfirmTransactionModalComponent;
  let fixture: ComponentFixture<ConfirmTransactionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmTransactionModalComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmTransactionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
