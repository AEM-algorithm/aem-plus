import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImportAccountPage } from './import-account.page';

describe('ImportAccountPage', () => {
  let component: ImportAccountPage;
  let fixture: ComponentFixture<ImportAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImportAccountPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
