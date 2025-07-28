import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Currency } from '../../shared/models/currency.model';

@Component({
  selector: 'app-currency-converter-form',
  imports: [FormsModule],
  templateUrl: './currency-converter-form.html',
  styleUrl: './currency-converter-form.scss'
})
export class CurrencyConverterForm {

  currencies = input.required<Currency[]>();           // Lista walut
  isLoading = input(false);                           // Loading state
  error = input<Error | null>(null);                  // Error state

  fromCurrency = model.required<string>();            // [(fromCurrency)]
  toCurrency = model.required<string>();              // [(toCurrency)]
  amount = model.required<number>();                  // [(amount)]

  conversionRequest = output<void>();                 // (conversionRequest)
  formReset = output<void>();                         // (formReset)
  currenciesSwap = output<void>();                    // (currenciesSwap)

  protected onSubmit(): void {
    this.conversionRequest.emit();
  }

  protected onReset(): void {
    this.formReset.emit();
  }

  protected onSwap(): void {
    this.currenciesSwap.emit();
  }
}
