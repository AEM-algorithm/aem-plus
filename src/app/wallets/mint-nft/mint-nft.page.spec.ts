import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MintNftPage } from './mint-nft.page';

describe('MintNftPage', () => {
  let component: MintNftPage;
  let fixture: ComponentFixture<MintNftPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MintNftPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MintNftPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
