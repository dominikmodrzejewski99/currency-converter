import { Component, input, model, output, inject, DestroyRef, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyType } from '../../shared/models/currency.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { exhaustMap, filter } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-currency-converter-form',
  imports: [FormsModule, MatProgressSpinner, MatIcon, MatOption, MatFormField, MatOption, MatSelect, MatInput, MatLabel],
  templateUrl: './currency-converter-form.html',
  standalone: true,
  styleUrl: './currency-converter-form.scss'
})
export class CurrencyConverterForm {
  private readonly destroyRef = inject(DestroyRef);

  readonly availableFromCurrencies = input.required<CurrencyType[]>();
  readonly availableToCurrencies = input.required<CurrencyType[]>();
  readonly isFormValid = input.required<boolean>();
  readonly isLoading = input(false);

  readonly currenciesError = input<Error | null>(null);
  readonly conversionError = input<Error | null>(null);

  readonly fromCurrency = model.required<string>();
  readonly toCurrency = model.required<string>();
  readonly amount = model.required<number>();

  readonly conversionRequest = output<void>();

  readonly hasError = computed(() =>
    !!this.currenciesError() || !!this.conversionError()
  );

  private readonly formState = computed(() => ({
    fromCurrency: this.fromCurrency(),
    toCurrency: this.toCurrency(),
    amount: this.amount()
  }));

  constructor() {
    this.initConversion();
  }

  private initConversion(): void {
    toObservable(this.formState)
      .pipe(
        filter(() => this.isFormValid() && !this.hasError()),
        exhaustMap(() => {
          this.conversionRequest.emit();
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
