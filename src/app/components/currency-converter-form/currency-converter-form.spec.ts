import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConverterForm } from './currency-converter-form';

describe('CurrencyConverterForm', () => {
  let component: CurrencyConverterForm;
  let fixture: ComponentFixture<CurrencyConverterForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyConverterForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyConverterForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
