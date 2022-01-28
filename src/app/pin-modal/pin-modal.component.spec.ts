import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PinModalComponent } from './pin-modal.component';

describe('PinModalComponent', () => {
  let component: PinModalComponent;
  let fixture: ComponentFixture<PinModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinModalComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PinModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
