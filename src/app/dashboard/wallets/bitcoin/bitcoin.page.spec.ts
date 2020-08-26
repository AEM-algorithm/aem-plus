import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BitcoinPage } from './bitcoin.page';

describe('BitcoinPage', () => {
  let component: BitcoinPage;
  let fixture: ComponentFixture<BitcoinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitcoinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BitcoinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
