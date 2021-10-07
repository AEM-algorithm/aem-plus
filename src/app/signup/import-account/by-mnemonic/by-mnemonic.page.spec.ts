import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ByMnemonicPage } from './by-mnemonic.page';

describe('ByMnemonicPage', () => {
  let component: ByMnemonicPage;
  let fixture: ComponentFixture<ByMnemonicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByMnemonicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ByMnemonicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
