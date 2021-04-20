import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeeAdjustModalComponent } from './fee-adjust-modal.component';

describe('FeeAdjustModalComponent', () => {
  let component: FeeAdjustModalComponent;
  let fixture: ComponentFixture<FeeAdjustModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeAdjustModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeeAdjustModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
