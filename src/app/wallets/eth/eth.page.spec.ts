import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EthPage } from './eth.page';

describe('EthPage', () => {
  let component: EthPage;
  let fixture: ComponentFixture<EthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EthPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(EthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
