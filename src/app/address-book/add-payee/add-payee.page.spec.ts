import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPayeePage } from './add-payee.page';

describe('AddPayeePage', () => {
  let component: AddPayeePage;
  let fixture: ComponentFixture<AddPayeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPayeePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPayeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
