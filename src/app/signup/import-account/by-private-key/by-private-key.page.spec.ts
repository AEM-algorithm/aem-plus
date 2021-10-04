import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ByPrivateKeyPage } from './by-private-key.page';

describe('ByPrivateKeyPage', () => {
  let component: ByPrivateKeyPage;
  let fixture: ComponentFixture<ByPrivateKeyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByPrivateKeyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ByPrivateKeyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
