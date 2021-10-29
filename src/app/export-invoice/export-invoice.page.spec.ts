import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExportInvoicePage } from './export-invoice.page';

describe('ExportInvoicePage', () => {
  let component: ExportInvoicePage;
  let fixture: ComponentFixture<ExportInvoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportInvoicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExportInvoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
