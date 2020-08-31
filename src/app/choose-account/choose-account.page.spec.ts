import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChooseAccountPage } from './choose-account.page';

describe('ChooseAccountPage', () => {
  let component: ChooseAccountPage;
  let fixture: ComponentFixture<ChooseAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
