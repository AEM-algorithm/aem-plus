import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChooseSendAccountPage } from './choose-send-account.page';

describe('ChooseAccountPage', () => {
  let component: ChooseSendAccountPage;
  let fixture: ComponentFixture<ChooseSendAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseSendAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseSendAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
