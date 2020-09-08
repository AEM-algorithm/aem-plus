import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChooseReceiveAccountPage } from './choose-receive-account.page';

describe('ChooseReceiveAccountPage', () => {
  let component: ChooseReceiveAccountPage;
  let fixture: ComponentFixture<ChooseReceiveAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseReceiveAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseReceiveAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
