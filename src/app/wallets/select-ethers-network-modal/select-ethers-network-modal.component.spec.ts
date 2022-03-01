import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectEthersNetworkModalComponent } from './select-ethers-network-modal.component';

describe('SelectEthersNetworkModalComponent', () => {
  let component: SelectEthersNetworkModalComponent;
  let fixture: ComponentFixture<SelectEthersNetworkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectEthersNetworkModalComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectEthersNetworkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
