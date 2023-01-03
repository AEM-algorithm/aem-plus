import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SymbolPage } from './symbol.page';

describe('SymbolPage', () => {
  let component: SymbolPage;
  let fixture: ComponentFixture<SymbolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SymbolPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SymbolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
