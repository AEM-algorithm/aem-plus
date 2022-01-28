import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendRequestMultisigPage } from './send-request-multisig.page';

describe('SendRequestMultisigPage', () => {
  let component: SendRequestMultisigPage;
  let fixture: ComponentFixture<SendRequestMultisigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendRequestMultisigPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SendRequestMultisigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
