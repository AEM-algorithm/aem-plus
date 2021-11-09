import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExportCompletePage } from './export-complete.page';

describe('ExportCompletePage', () => {
  let component: ExportCompletePage;
  let fixture: ComponentFixture<ExportCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportCompletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExportCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
