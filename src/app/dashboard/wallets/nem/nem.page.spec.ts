import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NemPage } from './nem.page';

describe('NemPage', () => {
  let component: NemPage;
  let fixture: ComponentFixture<NemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
