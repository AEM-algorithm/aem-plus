import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SymbolNodeSelectionComponent } from './symbol-node-selection.component';

describe('SymbolNodeSelectionComponent', () => {
  let component: SymbolNodeSelectionComponent;
  let fixture: ComponentFixture<SymbolNodeSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolNodeSelectionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SymbolNodeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
