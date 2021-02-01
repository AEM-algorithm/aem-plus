import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilteredTransactionModalComponent } from './filtered-transaction-modal.component';

describe('FilteredTransactionModalComponent', () => {
  let component: FilteredTransactionModalComponent;
  let fixture: ComponentFixture<FilteredTransactionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredTransactionModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilteredTransactionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
