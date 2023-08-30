import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BNBPage } from './bnb.page';

describe('BNBPage', () => {
  let component: BNBPage;
  let fixture: ComponentFixture<BNBPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BNBPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(BNBPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
