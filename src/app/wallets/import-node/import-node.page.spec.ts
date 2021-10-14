import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImportNodePage } from './import-node.page';

describe('ImportNodePage', () => {
  let component: ImportNodePage;
  let fixture: ComponentFixture<ImportNodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportNodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImportNodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
