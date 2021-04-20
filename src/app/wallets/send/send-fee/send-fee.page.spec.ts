import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendFeePage } from './send-fee.page';

describe('SendFeePage', () => {
  let component: SendFeePage;
  let fixture: ComponentFixture<SendFeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendFeePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendFeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
