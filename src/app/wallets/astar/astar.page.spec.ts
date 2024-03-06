import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AstarPage } from './astar.page';

describe('AstarPage', () => {
  let component: AstarPage;
  let fixture: ComponentFixture<AstarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AstarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
