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

  private readonly availableFromCurrencies = computed(() => {
    return this.currencyService.currencies().filter(currency =>
      currency.short_code !== this.toCurrency()
    );
  });

  private readonly availableToCurrencies = computed(() => {
    return this.currencyService.currencies().filter(currency =>
      currency.short_code !== this.fromCurrency()
    );
  });

  protected readonly isFormValid = computed(() =>
    !!this.fromCurrency() &&
    !!this.toCurrency() &&
    this.amount() > 0 &&
    this.fromCurrency() !== this.toCurrency()
  );

  private readonly hasError = computed(() =>
    !!this.currencyService.currenciesError() || !!this.currencyService.conversionError()
  );

  private readonly hasLoading = computed(() =>
    this.currencyService.isCurrenciesLoading() || this.currencyService.isConversionLoading()
  );

  protected readonly viewModel = computed(() => ({
    availableFromCurrencies: this.availableFromCurrencies(),
    availableToCurrencies: this.availableToCurrencies(),

    isCurrenciesLoading: this.currencyService.isCurrenciesLoading(),
    currenciesError: this.currencyService.currenciesError(),

    conversionResult: this.currencyService.conversionResult(),
    isConversionLoading: this.currencyService.isConversionLoading(),
    conversionError: this.currencyService.conversionError(),

    isFormValid: this.isFormValid(),
    hasError: this.hasError(),
    hasLoading: this.hasLoading()
  }));

  protected onConversionRequested(): void {
    if (this.isFormValid() && !this.hasError()) {
      this.currencyService.convertCurrency({
        from: this.fromCurrency(),
        to: this.toCurrency(),
        amount: this.amount()
      });
    }
  }
}
