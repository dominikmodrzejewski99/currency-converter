import { Component, computed, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from './core/services/currency-service';
import { CurrencyConverterForm } from './components/currency-converter-form/currency-converter-form';
import { ConversionResult } from './components/conversion-result/conversion-result';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CurrencyConverterForm, ConversionResult],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
  private readonly currencyService = inject(CurrencyService);

  protected readonly fromCurrency = model('');
  protected readonly toCurrency = model('');
  protected readonly amount = model(1);

  protected readonly isFormValid = computed(() =>
    this.fromCurrency() &&
    this.toCurrency() &&
    this.amount() > 0 &&
    this.fromCurrency() !== this.toCurrency()
  );

  protected readonly viewModel = computed(() => ({
    currencies: this.currencyService.currencies(),
    isCurrenciesLoading: this.currencyService.isCurrenciesLoading(),
    currenciesError: this.currencyService.currenciesError(),

    conversionResult: this.currencyService.conversionResult(),
    isConversionLoading: this.currencyService.isConversionLoading(),
    conversionError: this.currencyService.conversionError(),

    isFormValid: this.isFormValid()
  }));

  protected onConversionRequested(): void {
    if (this.isFormValid()) {
      this.currencyService.convertCurrency({
        from: this.fromCurrency(),
        to: this.toCurrency(),
        amount: this.amount()
      });
    }
  }

  protected onFormReset(): void {
    this.fromCurrency.set('');
    this.toCurrency.set('');
    this.amount.set(1);
    this.currencyService.clearConversion();
  }

  protected onCurrenciesSwap(): void {
    const temp = this.fromCurrency();
    this.fromCurrency.set(this.toCurrency());
    this.toCurrency.set(temp);
  }

  protected onClearResult(): void {
    this.currencyService.clearConversion();
  }
}
