import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NemChartComponent } from './nem-chart.component';

describe('NemChartComponent', () => {
  let component: NemChartComponent;
  let fixture: ComponentFixture<NemChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NemChartComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NemChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
