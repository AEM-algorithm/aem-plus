import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BitcoinAddressComponent } from './bitcoin-address.component';

describe('BitcoinInfoComponent', () => {
  let component: BitcoinAddressComponent;
  let fixture: ComponentFixture<BitcoinAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BitcoinAddressComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(BitcoinAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
