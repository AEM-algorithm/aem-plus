import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExportFilePage } from './export-file.page';

describe('ExportFilePage', () => {
  let component: ExportFilePage;
  let fixture: ComponentFixture<ExportFilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExportFilePage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportFilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
