import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddConsignatorPage } from './add-consignator.page';

describe('AddConsignatorPage', () => {
  let component: AddConsignatorPage;
  let fixture: ComponentFixture<AddConsignatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddConsignatorPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AddConsignatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
