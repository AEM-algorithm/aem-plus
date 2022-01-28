import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerifyCreateAccountPage } from './verify-create-account.page';

describe('VerifyCreateAccountPage', () => {
  let component: VerifyCreateAccountPage;
  let fixture: ComponentFixture<VerifyCreateAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyCreateAccountPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyCreateAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
