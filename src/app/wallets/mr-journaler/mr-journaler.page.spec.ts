import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MrJournalerPage } from './mr-journaler.page';

describe('MrJournalerPage', () => {
  let component: MrJournalerPage;
  let fixture: ComponentFixture<MrJournalerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MrJournalerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MrJournalerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
