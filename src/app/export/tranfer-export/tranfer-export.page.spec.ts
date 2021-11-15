import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TranferExportPage } from './tranfer-export.page';

describe('TranferExportPage', () => {
  let component: TranferExportPage;
  let fixture: ComponentFixture<TranferExportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranferExportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TranferExportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
