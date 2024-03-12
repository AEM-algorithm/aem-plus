import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MintNftModalComponent } from './mint-nft-modal.component';

describe('MintNftModalComponent', () => {
  let component: MintNftModalComponent;
  let fixture: ComponentFixture<MintNftModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MintNftModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MintNftModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
