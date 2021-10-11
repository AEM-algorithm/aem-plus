import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSignerPage } from './add-signer.page';

describe('AddSignerPage', () => {
  let component: AddSignerPage;
  let fixture: ComponentFixture<AddSignerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSignerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSignerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
