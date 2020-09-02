import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExportUnlockedComponent } from './export-unlocked.component';

describe('ExportUnlockedComponent', () => {
  let component: ExportUnlockedComponent;
  let fixture: ComponentFixture<ExportUnlockedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportUnlockedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExportUnlockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
