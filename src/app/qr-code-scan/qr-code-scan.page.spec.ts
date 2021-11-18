import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrCodeScanPage } from './qr-code-scan.page';

describe('QrCodeScanPage', () => {
  let component: QrCodeScanPage;
  let fixture: ComponentFixture<QrCodeScanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrCodeScanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrCodeScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
