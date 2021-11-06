import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BitcoinNodeSelectionComponent } from './bitcoin-node-selection.component';

describe('NemNodeSelectionComponent', () => {
  let component: BitcoinNodeSelectionComponent;
  let fixture: ComponentFixture<BitcoinNodeSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BitcoinNodeSelectionComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BitcoinNodeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
