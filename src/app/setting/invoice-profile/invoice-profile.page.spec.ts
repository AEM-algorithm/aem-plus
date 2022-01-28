import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvoiceProfilePage } from './invoice-profile.page';

describe('InvoiceProfilePage', () => {
  let component: InvoiceProfilePage;
  let fixture: ComponentFixture<InvoiceProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceProfilePage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
